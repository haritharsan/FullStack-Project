package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * This program demonstrates:
 * - Loops (for, while, do-while)
 * - If-else conditions
 * - Proper naming conventions in Java
 * - Class, method, and variable examples
 * - Simple student marks processing logic
 */

public class StudentMarksManager {

    // ----- CONSTANTS -----
    private static final int MAX_STUDENTS = 50;
    private static final int PASS_MARK = 40;

    // ----- MODEL CLASS -----
    static class Student {
        private String studentName;
        private int studentMark;

        public Student(String studentName, int studentMark) {
            this.studentName = studentName;
            this.studentMark = studentMark;
        }

        public String getStudentName() {
            return studentName;
        }

        public int getStudentMark() {
            return studentMark;
        }
    }

    // ----- MAIN METHOD -----
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        List<Student> studentList = new ArrayList<>();

        System.out.println("------ Student Marks Manager ------");

        boolean continueEntering = true;

        // Loop to add multiple students
        while (continueEntering) {

            System.out.print("Enter Student Name: ");
            String nameInput = scanner.nextLine();

            System.out.print("Enter Student Mark (0-100): ");
            int markInput = Integer.parseInt(scanner.nextLine());

            // Add student to list
            Student student = new Student(nameInput, markInput);
            studentList.add(student);

            // Check if user wants to continue
            System.out.print("Add another student? (yes/no): ");
            String userChoice = scanner.nextLine().trim().toLowerCase();

            if (userChoice.equals("no")) {
                continueEntering = false;
            }
        }

        System.out.println("\n------ Student Result Summary ------");

        // Process students using a for loop
        for (int index = 0; index < studentList.size(); index++) {
            Student student = studentList.get(index);

            System.out.println("Student #" + (index + 1));
            System.out.println("Name : " + student.getStudentName());
            System.out.println("Mark : " + student.getStudentMark());

            // If-else logic for result
            if (student.getStudentMark() >= PASS_MARK) {
                System.out.println("Result: PASS");
            } else {
                System.out.println("Result: FAIL");
            }

            System.out.println("-------------------------------");
        }

        // ----- FIND HIGHEST MARK -----
        int highestMark = 0;
        String topperName = "";

        for (Student student : studentList) {
            if (student.getStudentMark() > highestMark) {
                highestMark = student.getStudentMark();
                topperName = student.getStudentName();
            }
        }

        System.out.println("Topper: " + topperName + " with " + highestMark + " marks\n");

        // ----- WHILE LOOP DEMO -----
        System.out.println("------ While Loop Counting Demo ------");

        int counter = 1;
        while (counter <= 5) {
            System.out.println("Counter: " + counter);
            counter++;
        }

        // ----- DO-WHILE DEMO -----
        System.out.println("\n------ Do-While Loop Demo ------");

        int value = 1;
        do {
            System.out.println("Value: " + value);
            value++;
        } while (value <= 5);

        // ----- SEARCH STUDENT -----
        System.out.println("\n------ Search Student By Name ------");
        System.out.print("Enter Name to Search: ");
        String searchName = scanner.nextLine().trim();

        boolean studentFound = false;

        for (Student student : studentList) {
            if (student.getStudentName().equalsIgnoreCase(searchName)) {
                System.out.println("Student Found!");
                System.out.println("Name : " + student.getStudentName());
                System.out.println("Mark : " + student.getStudentMark());

                if (student.getStudentMark() >= PASS_MARK) {
                    System.out.println("Status: PASS");
                } else {
                    System.out.println("Status: FAIL");
                }

                studentFound = true;
                break;
            }
        }

        if (!studentFound) {
            System.out.println("Student not found in the list.");
        }

        // ----- PRINT ALL STUDENTS (FOREACH) -----
        System.out.println("\n------ Final Student List ------");
        for (Student student : studentList) {
            System.out.println(student.getStudentName() + " - " + student.getStudentMark());
        }

        System.out.println("\nProgram Completed. Goodbye!");
        scanner.close();
    }
}
