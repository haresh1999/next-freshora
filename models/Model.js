import pool from "@/lib/db";

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

    static async where(conditions) {
        const columns = Object.keys(conditions);

        const whereClause = columns
            .map(() => "?? = ?")
            .join(" AND ");

        const values = columns.flatMap(column => [
            column,
            conditions[column],
        ]);

        const [rows] = await pool.query(
            `SELECT * FROM ?? WHERE ${whereClause}`,
            [this.table, ...values]
        );

        return rows.map(row => new this(row));
    }

    static async whereLimit(conditions, limit = 10, random = false) {
        const columns = Object.keys(conditions);

        const whereClause = columns
            .map(() => "?? = ?")
            .join(" AND ");

        const values = columns.flatMap(column => [
            column,
            conditions[column],
        ]);

        const orderBy = random ? "ORDER BY RAND()" : "";

        const [rows] = await pool.query(
            `SELECT * FROM ?? WHERE ${whereClause} ${orderBy} LIMIT ?`,
            [this.table, ...values, limit]
        );

        return rows.map(row => new this(row));
    }

    static async whereIn(column1, value1, column2, value2) {
        const [rows] = await pool.query(
            `SELECT * FROM ?? WHERE ?? = ? AND ?? = ?`,
            [this.table, column1, value1, column2, value2]
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

    static async delete(conditions) {

        const columns = Object.keys(conditions);

        if (!columns.length) {
            throw new Error("Delete conditions are required.");
        }

        const whereClause = columns
            .map(() => "?? = ?")
            .join(" AND ");

        const values = columns.flatMap(column => [
            column,
            conditions[column],
        ]);

        const [result] = await pool.query(
            `DELETE FROM ?? WHERE ${whereClause}`,
            [this.table, ...values]
        );

        return result.affectedRows > 0;
    }

    static async join(joinTable, firstColumn, secondColumn, conditions, limit) {

        const columns = Object.keys(conditions);

        let sql = `SELECT * FROM ?? INNER JOIN ?? ON ?? = ??`;

        const values = [
            this.table,
            joinTable,
            firstColumn,
            secondColumn,
        ];

        if (columns.length > 0) {
            const whereClause = columns
                .map(() => "?? = ?")
                .join(" AND ");

            sql += ` WHERE ${whereClause}`;

            values.push(
                ...columns.flatMap(column => [
                    column,
                    conditions[column],
                ])
            );
        }

        if (limit && Number.isInteger(limit) && limit > 0) {
            sql += " LIMIT ?";
            values.push(limit);
        }

        const [rows] = await pool.query(sql, values);

        return rows;
    }

}

export default Model;