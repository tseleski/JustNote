import React from 'react';
import TagIndexItem from './tag_index_item';
import Loading from '../loader';

class TagIndex extends React.Component {
  constructor(props){
    super(props);
    const prevState = { fetchedTags: false };
    this.state = Object.assign(prevState, this.props);
  }

  componentDidMount() {
    this.props.clearTags();
    this.props.fetchTags().then(
      () => this.setState({ fetchedTags: true })
    );
  }

  // componentWillUnmount() {
  //   this.props.clearTags();
  // }

  render(){
    const { tags } = this.props;
    if (!this.state.fetchedTags && tags.length === 0) {
      return <Loading page={"tags"} />
    } else if (this.state.fetchedTags && tags.length === 0){
      return ( 
        <div className="tag-page">
          <div className="tags-header">
            Tags
          </div>
          <div className="tags-content">
            <div className="tags-list">
              <div className="no-tags">
                0 tags
              </div>
            </div>
          </div>
        </div>
      )
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