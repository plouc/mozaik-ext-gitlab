import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class MergeRequestItem extends Component {
    render() {
        const { mergeRequest } = this.props;

        const cssClasses = `list__item`;

        return (
            <div className={cssClasses}>
                <a href={`${''}/builds/${mergeRequest.id}`} target="_blank">
                    #{mergeRequest.title}
                </a>
                <br />

                <span className="label__group">
                    <span className="label__addon">by</span>
                        <span className="label">{mergeRequest.author.name}</span>
                </span>
                <span className="label__group">
                    <span className="label__addon">upvotes</span>
                    <span className="label">{mergeRequest.upvotes}</span>
                </span>
                &nbsp;
                <br />
                <time className="list__item__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(mergeRequest.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </time>

            </div>
        );
    }
}

MergeRequestItem.displayName = 'MergeRequestItem';

MergeRequestItem.propTypes = {
    project: PropTypes.shape({
        web_url: PropTypes.string.isRequired
    }).isRequired,
    build: PropTypes.shape({
        id:          PropTypes.number.isRequired,
        status:      PropTypes.string.isRequired,
        finished_at: PropTypes.string,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        })
    }).isRequired
};


export default MergeRequestItem;