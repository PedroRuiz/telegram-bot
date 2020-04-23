'use strict';
import { pool } from '../database';

export class User {

  constructor(user) {
    this.id = user.id;
    this.is_bot = user.is_bot;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.language_code = user.language_code;
  }

  async idExists() {
    let conn;
    try {
      conn = await pool.getConnection();
      const row = await conn.query(
        'SELECT * FROM users WHERE id = ?',
        [this.id]
      );

      return (row[0] === undefined) ? false : true;

    } catch (err) {
      throw new Error(err);
      return false;

    } finally {
      if (conn) conn.release();
    }
  }

  async newUser() {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(
        'INSERT INTO users(id, first_name, last_name, username, language_code, active) VALUES(?,?,?,?,?,?)',
        [this.id, this.first_name, this.last_name, this.username, this.language_code, true]
      );
      return res;

    } catch (err) {
      throw new Error(err);
      return false;
      
    } finally {
      if (conn) conn.release();

    }
  }

  async memory(data) {
    let conn;
    try {
      conn = await pool.getConnection();
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      
      const res = await conn.query(
        'INSERT INTO memory(idusers, timemark, memory) VALUES(?,?,?)',
        [this.id, now, data]
      );
      return res;
    
    } catch (err) {
      
      return false;

    } finally {
      if (conn) conn.release();
    }
  }

  async delete(idToDelete) {
    let conn;
    try {
      conn = await pool.getConnection();
      
      const res = await conn.query(
        'DELETE FROM memory WHERE idmemory = ?',
        [idToDelete]
      );
      return res;

    } catch (err) {
      return false;
    
    } finally {
      conn.release();
      
    }
  }

  async recover() {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(
        'SELECT idmemory, date_format(timemark,"%d/%m/%Y %h:%i:%s") as timemark, memory FROM memory WHERE idusers = ?',
        [this.id]
      );

      
      return res;

    } catch (err) {
      return err;

    } finally {
      if (conn) conn.release();

    }
  }
  
} // ends class
