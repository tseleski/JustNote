import React from 'react';
import { Link } from 'react-router-dom';
import TagIndexItem from './tag_index_item';

class TagIndex extends React.Component {

  componentDidMount() {
    this.props.fetchTags();
  }

  render(){
    const { tags } = this.props;
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

export default TagIndex;