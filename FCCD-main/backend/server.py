from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import os
from datetime import datetime, date
import uuid

# MongoDB connection
MONGO_URL = os.environ.get("MONO_URL", "mongodb://localhost:27017")
if MONGO_URL == "mongodb://localhost:27017":
    MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URL)
db = client.student_dashboard

app = FastAPI(title="Student Dashboard API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Course(BaseModel):
    id: Optional[str] = None
    code: str
    name: str
    instructor: str
    credits: int
    schedule: str
    room: str
    student_id: str

class Assignment(BaseModel):
    id: Optional[str] = None
    course_code: str
    title: str
    description: str
    due_date: str
    status: str  # "pending", "completed", "overdue"
    student_id: str

class Grade(BaseModel):
    id: Optional[str] = None
    course_code: str
    assignment_title: str
    grade: str
    points_earned: float
    points_possible: float
    date_graded: str
    student_id: str

class TodoItem(BaseModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    priority: str  # "low", "medium", "high"
    completed: bool = False
    student_id: str

class Message(BaseModel):
    id: Optional[str] = None
    sender: str
    subject: str
    content: str
    date_sent: str
    read: bool = False
    student_id: str

class Bill(BaseModel):
    id: Optional[str] = None
    semester: str
    total_amount: float
    paid_amount: float
    due_date: str
    courses: List[dict]
    student_id: str

# Student data endpoints
@app.get("/api/student/{student_id}/courses")
async def get_courses(student_id: str):
    """Get all courses for a student"""
    courses = await db.courses.find({"student_id": student_id}).to_list(100)
    return [{"id": str(course["_id"]), **{k: v for k, v in course.items() if k != "_id"}} for course in courses]

@app.post("/api/student/{student_id}/courses")
async def create_course(student_id: str, course: Course):
    """Add a new course for a student"""
    course.student_id = student_id
    course.id = str(uuid.uuid4())
    course_dict = course.dict()
    await db.courses.insert_one(course_dict)
    return {"message": "Course created successfully", "course_id": course.id}

@app.get("/api/student/{student_id}/assignments")
async def get_assignments(student_id: str):
    """Get all assignments for a student"""
    assignments = await db.assignments.find({"student_id": student_id}).to_list(100)
    return [{"id": str(assignment["_id"]), **{k: v for k, v in assignment.items() if k != "_id"}} for assignment in assignments]

@app.post("/api/student/{student_id}/assignments")
async def create_assignment(student_id: str, assignment: Assignment):
    """Add a new assignment for a student"""
    assignment.student_id = student_id
    assignment.id = str(uuid.uuid4())
    assignment_dict = assignment.dict()
    await db.assignments.insert_one(assignment_dict)
    return {"message": "Assignment created successfully", "assignment_id": assignment.id}

@app.get("/api/student/{student_id}/grades")
async def get_grades(student_id: str):
    """Get all grades for a student"""
    grades = await db.grades.find({"student_id": student_id}).to_list(100)
    return [{"id": str(grade["_id"]), **{k: v for k, v in grade.items() if k != "_id"}} for grade in grades]

@app.post("/api/student/{student_id}/grades")
async def create_grade(student_id: str, grade: Grade):
    """Add a new grade for a student"""
    grade.student_id = student_id
    grade.id = str(uuid.uuid4())
    grade_dict = grade.dict()
    await db.grades.insert_one(grade_dict)
    return {"message": "Grade created successfully", "grade_id": grade.id}

@app.get("/api/student/{student_id}/todo")
async def get_todo_items(student_id: str):
    """Get all todo items for a student"""
    todos = await db.todos.find({"student_id": student_id}).to_list(100)
    return [{"id": str(todo["_id"]), **{k: v for k, v in todo.items() if k != "_id"}} for todo in todos]

@app.post("/api/student/{student_id}/todo")
async def create_todo_item(student_id: str, todo: TodoItem):
    """Add a new todo item for a student"""
    todo.student_id = student_id
    todo.id = str(uuid.uuid4())
    todo_dict = todo.dict()
    await db.todos.insert_one(todo_dict)
    return {"message": "Todo item created successfully", "todo_id": todo.id}

@app.put("/api/student/{student_id}/todo/{todo_id}")
async def update_todo_item(student_id: str, todo_id: str, todo: TodoItem):
    """Update a todo item"""
    todo.student_id = student_id
    todo.id = todo_id
    todo_dict = todo.dict()
    result = await db.todos.update_one(
        {"id": todo_id, "student_id": student_id},
        {"$set": todo_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return {"message": "Todo item updated successfully"}

@app.get("/api/student/{student_id}/messages")
async def get_messages(student_id: str):
    """Get all messages for a student"""
    messages = await db.messages.find({"student_id": student_id}).to_list(100)
    return [{"id": str(message["_id"]), **{k: v for k, v in message.items() if k != "_id"}} for message in messages]

@app.post("/api/student/{student_id}/messages")
async def create_message(student_id: str, message: Message):
    """Add a new message for a student"""
    message.student_id = student_id
    message.id = str(uuid.uuid4())
    message_dict = message.dict()
    await db.messages.insert_one(message_dict)
    return {"message": "Message created successfully", "message_id": message.id}

@app.get("/api/student/{student_id}/bill")
async def get_bill(student_id: str):
    """Get bill information for a student"""
    bill = await db.bills.find_one({"student_id": student_id})
    if not bill:
        return None
    return {"id": str(bill["_id"]), **{k: v for k, v in bill.items() if k != "_id"}}

@app.post("/api/student/{student_id}/bill")
async def create_or_update_bill(student_id: str, bill: Bill):
    """Create or update bill for a student"""
    bill.student_id = student_id
    bill.id = str(uuid.uuid4())
    bill_dict = bill.dict()
    
    # Check if bill already exists
    existing_bill = await db.bills.find_one({"student_id": student_id, "semester": bill.semester})
    if existing_bill:
        await db.bills.update_one(
            {"student_id": student_id, "semester": bill.semester},
            {"$set": bill_dict}
        )
        return {"message": "Bill updated successfully"}
    else:
        await db.bills.insert_one(bill_dict)
        return {"message": "Bill created successfully", "bill_id": bill.id}

# Dashboard summary endpoint
@app.get("/api/student/{student_id}/dashboard")
async def get_dashboard_summary(student_id: str):
    """Get dashboard summary for a student"""
    courses = await db.courses.find({"student_id": student_id}).to_list(100)
    assignments = await db.assignments.find({"student_id": student_id}).to_list(100)
    pending_assignments = [a for a in assignments if a["status"] == "pending"]
    unread_messages = await db.messages.count_documents({"student_id": student_id, "read": False})
    
    return {
        "total_courses": len(courses),
        "total_credits": sum(course["credits"] for course in courses),
        "pending_assignments": len(pending_assignments),
        "unread_messages": unread_messages,
        "courses": [{"id": str(course["_id"]), **{k: v for k, v in course.items() if k != "_id"}} for course in courses]
    }

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Student Dashboard API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)