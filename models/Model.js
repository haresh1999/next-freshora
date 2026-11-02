import pool from "@/config/database";

class Model {
    constructor(attributes = {}) {
        Object.assign(this, attributes);
    }

    static get table() {
        throw new Error("Table name not defined");
    }

    static async find(id) {
        const [rows] = await pool.query(
            `SELECT * FROM ?? WHERE id = ? LIMIT 1`,
            [this.table, id]
        );

        return rows.length ? new this(rows[0]) : null;
    }

    static async all() {
        const [rows] = await pool.query(
            `SELECT * FROM ??`,
            [this.table]
        );

        return rows.map(row => new this(row));
    }

    static async first() {
        const [rows] = await pool.query(
            `SELECT * FROM ?? LIMIT 1`,
            [this.table]
        );

        return rows.length ? new this(rows[0]) : null;
    }

    static async create(data) {
        const columns = Object.keys(data);
        const values = Object.values(data);

        const sql = `
            INSERT INTO ?? (${columns.map(() => "??").join(", ")})
            VALUES (${columns.map(() => "?").join(", ")})
        `;

        const [result] = await pool.query(sql, [
            this.table,
            ...columns,
            ...values
        ]);

        return this.find(result.insertId);
    }

    static async where(column, value) {
        const [rows] = await pool.query(
            `SELECT * FROM ?? WHERE ?? = ?`,
            [this.table, column, value]
        );

        return rows.map(row => new this(row));
    }

    static async update(id, data) {
        const columns = Object.keys(data);

        if (!columns.length) return false;

        const sql = `
            UPDATE ?? SET
            ${columns.map(() => "?? = ?").join(", ")}
            WHERE id = ?
        `;

        const values = columns.flatMap(column => [
            column,
            data[column]
        ]);

        const [result] = await pool.query(sql, [
            this.table,
            ...values,
            id
        ]);

        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(
            `DELETE FROM ?? WHERE id = ?`,
            [this.table, id]
        );

        return result.affectedRows > 0;
    }
}

export default Model;