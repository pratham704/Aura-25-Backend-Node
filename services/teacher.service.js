import { getConnection } from "../config/database.js";

// Create the teachers table if it doesn't exist
export const createTeacherTable = async() => {
    const connection = await getConnection();
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS teachers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            dateOfJoining DATE NOT NULL,
            gender ENUM('Male', 'Female', 'Other') NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;

        await connection.execute(query);
        console.log("Teacher table created or already exists.");
    } catch (error) {
        console.error("Error creating teacher table:", error.message);
    } finally {
        connection.release();
    }
};

// Get all teachers
export const getAllTeachers = async() => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute("SELECT * FROM teachers");
        return rows;
    } catch (error) {
        throw new Error("Failed to fetch teachers: " + error.message);
    } finally {
        connection.release();
    }
};

// Get a teacher by ID
export const getTeacherById = async(id) => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute(
            "SELECT * FROM teachers WHERE id = ?", [id]
        );
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch teacher: " + error.message);
    } finally {
        connection.release();
    }
};

// Create a new teacher
export const createTeacher = async(teacher) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, subject, dateOfJoining, gender } =
        teacher;
        const [result] = await connection.execute(
            "INSERT INTO teachers (firstName, lastName, email, subject, dateOfJoining, gender) VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, email, subject, dateOfJoining, gender]
        );
        return { id: result.insertId, ...teacher };
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new Error("A teacher with this email already exists.");
        } else {
            throw new Error("Failed to create teacher: " + error.message);
        }
    } finally {
        connection.release();
    }
};

// Update an existing teacher
export const updateTeacher = async(id, teacher) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, subject, dateOfJoining, gender } =
        teacher;
        const [result] = await connection.execute(
            "UPDATE teachers SET firstName = ?, lastName = ?, email = ?, subject = ?, dateOfJoining = ?, gender = ? WHERE id = ?", [firstName, lastName, email, subject, dateOfJoining, gender, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Failed to update teacher: " + error.message);
    } finally {
        connection.release();
    }
};

// Delete a teacher
export const deleteTeacher = async(id) => {
    const connection = await getConnection();
    try {
        const [result] = await connection.execute(
            "DELETE FROM teachers WHERE id = ?", [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Failed to delete teacher: " + error.message);
    } finally {
        connection.release();
    }
};