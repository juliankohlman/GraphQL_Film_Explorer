import React, { Component } from 'react';

export default class MovieReviews extends Component {
	renderReviews(reviews) {
		return reviews.map(review => {
			return (
				<article key={review.id}>
					<h4>{review.author} writes</h4>
					<div>{review.content}</div>
				</article>
			);
		});
	}
	render() {
		return (
			<div className="reviews">{this.renderReviews(this.props.review)}</div>
		);
	}
}
