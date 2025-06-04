class CSV {
	static filename = 'assets/checkins.csv';
	static columns = [
		'checkin_id',
		'created_at',
		'checkin_comment',
		'rating_score',
		'user_id',
		'user_name',
		'beer_id',
		'beer_name',
		'beer_style',
		'beer_slug',
		'beer_abv',
		'beer_link',
		'brewery_id',
		'brewery_name',
		'brewery_type',
		'brewery_country',
		'brewery_city',
		'brewery_link',
		'source_app',
		'toasts_count',
		'venue_id',
		'venue_name',
		'venue_country',
		'venue_city',
		'venue_lat',
		'venue_lng',
		'avg_rating',
		'ratings_count',
		'checkins_count'
	];

	static async readCSV() {
    const response = await fetch(this.filename);
    const data = await response.text();
    return data;
	}

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
}
