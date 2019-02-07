import React from 'react';
import TagIndexItem from './tag_index_item';
import Loading from '../loader';

class TagIndex extends React.Component {

  componentDidMount() {
    this.props.clearTags();
    this.props.fetchTags();
  }

  componentWillUnmount() {
    this.props.clearTags();
  }

  render(){
    const { tags } = this.props;
    if (tags.length === 0) {
      return <Loading page={"tags"} />
    } else {
      const tagsList = tags.map(tag => {
        return (
          <TagIndexItem key={tag.id} tag={tag} deleteTag={this.props.deleteTag} />
        )
      })

      return (
        <div className="tag-page">
          <div className="tags-header">
            Tags
          </div>
          <div className="tags-content">
            <div className="tags-list">
              {tagsList}
            </div>
          </div>
        </div>
      )
    }
  }
    
}

export default TagIndex;