import React, { Component, PropTypes } from 'react';
class PipelineHistoryItem extends Component {
	render() {
		const { project, pipeline } = this.props;

		const cssClasses = `list__item list__item--with-status list__item--with-status--${pipeline.status}`;

		return (
			<div className={cssClasses}>
				<a href={`${project.web_url}/pipelines/${pipeline.id}`} target="_blank">
					#{pipeline.id}
				</a>
				<span className="label__group">
					<span className="label__addon">ref</span>
					<span className="label">{pipeline.ref}</span>
				</span>
				&nbsp;
				<br />
			</div>
		);
	}
}

PipelineHistoryItem.displayName = 'PipelineHistoryItem';

PipelineHistoryItem.propTypes = {
	project: PropTypes.shape({
		web_url: PropTypes.string.isRequired
	}).isRequired,
	pipeline: PropTypes.shape({
		id: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired
};

export default PipelineHistoryItem;