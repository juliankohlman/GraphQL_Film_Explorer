import React, { Component } from 'react';

export default class MovieCredits extends Component {
	renderCast(credits) {
		return credits.map(cast => {
			return (
				<li key={cast.id}>
					<img
						src={`https://image.tmdb.org/t/p/w500//${cast.profile_path}`}
						alt="cast profile"
					/>
					<div className="castWrapper">
						<div className="castWrapperInfo">
							<span>{cast.name}</span>
							<span>{cast.character}</span>
						</div>
					</div>
				</li>
			);
		});
	}

	render() {
		return <ul className="cast">{this.renderCast(this.props.credits)}</ul>;
	}
}
