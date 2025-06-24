#!/usr/bin/env python3
import requests
import json
import sys
import uuid
from datetime import datetime, timedelta

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://3e3419f8-8a31-4681-ba28-43f742d7f613.preview.emergentagent.com"
STUDENT_ID = "james_pham_001"

# Test data
test_course = {
    "code": "DHY 202",
    "name": "Oral Pathology",
    "instructor": "Dr. Ricca",
    "credits": 3,
    "schedule": "Wednesday, Friday 10:00 AM - 11:30 AM",
    "room": "Room 305",
    "student_id": STUDENT_ID
}

test_assignment = {
    "course_code": "DHY 202",
    "title": "Oral Pathology Case Study",
    "description": "Analyze the provided case study and identify the pathological conditions",
    "due_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
    "status": "pending",
    "student_id": STUDENT_ID
}

test_grade = {
    "course_code": "DHY 202",
    "assignment_title": "Oral Pathology Case Study",
    "grade": "A",
    "points_earned": 95.0,
    "points_possible": 100.0,
    "date_graded": datetime.now().strftime("%Y-%m-%d"),
    "student_id": STUDENT_ID
}

test_todo = {
    "title": "Complete Oral Pathology Assignment",
    "description": "Finish the case study analysis for Dr. Ricca",
    "due_date": (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d"),
    "priority": "high",
    "completed": False,
    "student_id": STUDENT_ID
}

test_message = {
    "sender": "Dr. Ricca",
    "subject": "Upcoming Oral Pathology Exam",
    "content": "Please be prepared for the upcoming exam next week. Focus on chapters 5-8.",
    "date_sent": datetime.now().strftime("%Y-%m-%d"),
    "read": False,
    "student_id": STUDENT_ID
}

test_bill = {
    "semester": "Fall 2025",
    "total_amount": 1380.0,
    "paid_amount": 0.0,
    "due_date": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
    "courses": [
        {
            "code": "DHY 202",
            "name": "Oral Pathology",
            "credits": 3,
            "cost": 690.0
        },
        {
            "code": "RAD 111",
            "name": "Intro to Radiology",
            "credits": 3,
            "cost": 690.0
        }
    ],
    "student_id": STUDENT_ID
}

def print_separator():
    print("\n" + "="*80 + "\n")

def test_health_check():
    print("Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/api/health")
        response.raise_for_status()
        data = response.json()
        
        if response.status_code == 200 and data.get("status") == "healthy":
            print("✅ Health Check Test PASSED")
            return True
        else:
            print(f"❌ Health Check Test FAILED: Unexpected response: {data}")
            return False
    except Exception as e:
        print(f"❌ Health Check Test FAILED: {str(e)}")
        return False

def test_dashboard_summary():
    print("Testing Dashboard Summary Endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/dashboard")
        response.raise_for_status()
        data = response.json()
        
        if response.status_code == 200 and "total_courses" in data:
            print("✅ Dashboard Summary Test PASSED")
            print(f"Dashboard Data: {json.dumps(data, indent=2)}")
            return True
        else:
            print(f"❌ Dashboard Summary Test FAILED: Unexpected response: {data}")
            return False
    except Exception as e:
        print(f"❌ Dashboard Summary Test FAILED: {str(e)}")
        return False

def test_courses_endpoints():
    print("Testing Course Endpoints...")
    try:
        # Test POST endpoint
        post_response = requests.post(
            f"{BACKEND_URL}/api/student/{STUDENT_ID}/courses",
            json=test_course
        )
        post_response.raise_for_status()
        post_data = post_response.json()
        
        if post_response.status_code != 200 or "course_id" not in post_data:
            print(f"❌ Course POST Test FAILED: Unexpected response: {post_data}")
            return False
        
        print(f"✅ Course POST Test PASSED: {post_data}")
        
        # Test GET endpoint
        get_response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/courses")
        get_response.raise_for_status()
        get_data = get_response.json()
        
        if get_response.status_code == 200 and isinstance(get_data, list):
            print(f"✅ Course GET Test PASSED: Retrieved {len(get_data)} courses")
            return True
        else:
            print(f"❌ Course GET Test FAILED: Unexpected response: {get_data}")
            return False
    except Exception as e:
        print(f"❌ Course Endpoints Test FAILED: {str(e)}")
        return False

def test_assignments_endpoints():
    print("Testing Assignment Endpoints...")
    try:
        # Test POST endpoint
        post_response = requests.post(
            f"{BACKEND_URL}/api/student/{STUDENT_ID}/assignments",
            json=test_assignment
        )
        post_response.raise_for_status()
        post_data = post_response.json()
        
        if post_response.status_code != 200 or "assignment_id" not in post_data:
            print(f"❌ Assignment POST Test FAILED: Unexpected response: {post_data}")
            return False
        
        print(f"✅ Assignment POST Test PASSED: {post_data}")
        
        # Test GET endpoint
        get_response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/assignments")
        get_response.raise_for_status()
        get_data = get_response.json()
        
        if get_response.status_code == 200 and isinstance(get_data, list):
            print(f"✅ Assignment GET Test PASSED: Retrieved {len(get_data)} assignments")
            return True
        else:
            print(f"❌ Assignment GET Test FAILED: Unexpected response: {get_data}")
            return False
    except Exception as e:
        print(f"❌ Assignment Endpoints Test FAILED: {str(e)}")
        return False

def test_grades_endpoints():
    print("Testing Grade Endpoints...")
    try:
        # Test POST endpoint
        post_response = requests.post(
            f"{BACKEND_URL}/api/student/{STUDENT_ID}/grades",
            json=test_grade
        )
        post_response.raise_for_status()
        post_data = post_response.json()
        
        if post_response.status_code != 200 or "grade_id" not in post_data:
            print(f"❌ Grade POST Test FAILED: Unexpected response: {post_data}")
            return False
        
        print(f"✅ Grade POST Test PASSED: {post_data}")
        
        # Test GET endpoint
        get_response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/grades")
        get_response.raise_for_status()
        get_data = get_response.json()
        
        if get_response.status_code == 200 and isinstance(get_data, list):
            print(f"✅ Grade GET Test PASSED: Retrieved {len(get_data)} grades")
            return True
        else:
            print(f"❌ Grade GET Test FAILED: Unexpected response: {get_data}")
            return False
    except Exception as e:
        print(f"❌ Grade Endpoints Test FAILED: {str(e)}")
        return False

def test_todo_endpoints():
    print("Testing Todo Endpoints...")
    try:
        # Test POST endpoint
        post_response = requests.post(
            f"{BACKEND_URL}/api/student/{STUDENT_ID}/todo",
            json=test_todo
        )
        post_response.raise_for_status()
        post_data = post_response.json()
        
        if post_response.status_code != 200 or "todo_id" not in post_data:
            print(f"❌ Todo POST Test FAILED: Unexpected response: {post_data}")
            return False
        
        print(f"✅ Todo POST Test PASSED: {post_data}")
        
        # Test GET endpoint
        get_response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/todo")
        get_response.raise_for_status()
        get_data = get_response.json()
        
        if get_response.status_code == 200 and isinstance(get_data, list):
            print(f"✅ Todo GET Test PASSED: Retrieved {len(get_data)} todo items")
            return True
        else:
            print(f"❌ Todo GET Test FAILED: Unexpected response: {get_data}")
            return False
    except Exception as e:
        print(f"❌ Todo Endpoints Test FAILED: {str(e)}")
        return False

def test_messages_endpoints():
    print("Testing Message Endpoints...")
    try:
        # Test POST endpoint
        post_response = requests.post(
            f"{BACKEND_URL}/api/student/{STUDENT_ID}/messages",
            json=test_message
        )
        post_response.raise_for_status()
        post_data = post_response.json()
        
        if post_response.status_code != 200 or "message_id" not in post_data:
            print(f"❌ Message POST Test FAILED: Unexpected response: {post_data}")
            return False
        
        print(f"✅ Message POST Test PASSED: {post_data}")
        
        # Test GET endpoint
        get_response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/messages")
        get_response.raise_for_status()
        get_data = get_response.json()
        
        if get_response.status_code == 200 and isinstance(get_data, list):
            print(f"✅ Message GET Test PASSED: Retrieved {len(get_data)} messages")
            return True
        else:
            print(f"❌ Message GET Test FAILED: Unexpected response: {get_data}")
            return False
    except Exception as e:
        print(f"❌ Message Endpoints Test FAILED: {str(e)}")
        return False

def test_bill_endpoints():
    print("Testing Bill Endpoints...")
    try:
        # Test POST endpoint
        post_response = requests.post(
            f"{BACKEND_URL}/api/student/{STUDENT_ID}/bill",
            json=test_bill
        )
        post_response.raise_for_status()
        post_data = post_response.json()
        
        if post_response.status_code != 200 or ("bill_id" not in post_data and "message" not in post_data):
            print(f"❌ Bill POST Test FAILED: Unexpected response: {post_data}")
            return False
        
        print(f"✅ Bill POST Test PASSED: {post_data}")
        
        # Test GET endpoint
        get_response = requests.get(f"{BACKEND_URL}/api/student/{STUDENT_ID}/bill")
        get_response.raise_for_status()
        get_data = get_response.json()
        
        if get_response.status_code == 200:
            print(f"✅ Bill GET Test PASSED: {json.dumps(get_data, indent=2)}")
            return True
        else:
            print(f"❌ Bill GET Test FAILED: Unexpected response: {get_data}")
            return False
    except Exception as e:
        print(f"❌ Bill Endpoints Test FAILED: {str(e)}")
        return False

def run_all_tests():
    print_separator()
    print("STARTING STUDENT DASHBOARD API TESTS")
    print_separator()
    
    test_results = {
        "Health Check": test_health_check(),
        "Dashboard Summary": test_dashboard_summary(),
        "Courses Endpoints": test_courses_endpoints(),
        "Assignments Endpoints": test_assignments_endpoints(),
        "Grades Endpoints": test_grades_endpoints(),
        "Todo Endpoints": test_todo_endpoints(),
        "Messages Endpoints": test_messages_endpoints(),
        "Bill Endpoints": test_bill_endpoints()
    }
    
    print_separator()
    print("TEST SUMMARY")
    print_separator()
    
    all_passed = True
    for test_name, result in test_results.items():
        status = "PASSED" if result else "FAILED"
        print(f"{test_name}: {status}")
        if not result:
            all_passed = False
    
    print_separator()
    if all_passed:
        print("🎉 ALL TESTS PASSED! The Student Dashboard API is working correctly.")
    else:
        print("❌ SOME TESTS FAILED. Please check the logs above for details.")
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)