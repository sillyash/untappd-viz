// scripts/csv_tools.js
export class CSV {
  static filename = "assets/checkins.csv"; // Corrected path from your original post
  static columns = null;
  static csv = null;

  /* ---------- Initializer ---------- */

  static async readCSV() {
    this.csv = await d3.csv(this.filename);
    this.columns = this.csv.columns;
  }

  /* ----------- Functions ----------- */

  /**
   * Get the index of a column from the name
   * @static
   * @memberof CSV
   * @param {String} colname
   */
  static getColumnIndex(colname) {
    let i = this.columns.indexOf(colname);
    if (isNaN(i)) console.error(`Column ${colname} doesn't exist.`);
    return i;
  }

  /* --------------- Getters --------------- */

  static getCSV() { return this.csv; }
  static getColums() { return this.columns; }
}