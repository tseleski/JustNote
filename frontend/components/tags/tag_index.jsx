import React from 'react';
import TagIndexItem from './tag_index_item';
import Loading from '../loader';
import Modal from 'react-modal';

class TagIndex extends React.Component {
  constructor(props){
    super(props);
    const prevState = { fetchedTags: false, modalIsOpen: false };
    this.state = Object.assign(prevState, this.props, { name: "" });
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderByLetter = this.renderByLetter.bind(this);
  }

  componentDidMount() {
    this.props.clearTags();
    this.props.clearQuery();
    this.props.fetchTags().then(
      () => this.setState({ fetchedTags: true })
    );
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit() {
    if(this.state.name === ""){
      this.closeModal();
    } else {
      this.props.createTag({ name: this.state.name }).then(() => this.setState({ name: '' })).then(this.closeModal).then(this.props.fetchTags);
    }
  }

  renderByLetter(){
    const tagsCopy = this.props.tags.slice();
    const categories = [];
    while (tagsCopy.length > 0){
      let firstLetter = tagsCopy[0].name[0];
      const category = [];
      while (tagsCopy[0] && tagsCopy[0].name[0] === firstLetter){
        category.push(tagsCopy.shift());
      }
      categories.push(category);
    }
    const allCategories = categories.map(letterArr => {
      const capitalLetter = letterArr[0].name[0].toUpperCase();
      const tagsList = letterArr.map(tag => {
        return (
          <TagIndexItem key={tag.id} tag={tag} deleteTag={this.props.deleteTag} />
        )
      });
      return(
        <div key={capitalLetter}>
          <h2 key={capitalLetter} className="letter-header">{capitalLetter}</h2>
          {tagsList}
        </div>
      )
    })
    return allCategories;
  }


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
      const tagsList = this.renderByLetter();
      return (
        <div className="tag-page">
          <div className="tags-header">
            Tags
          <div className="new-notebook" onClick={this.openModal}>
            <i className="fa fa-tag"></i>
            New Tag </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Modal"
            className="create-modal"
            overlayClassName="create-modal-overlay"
            ariaHideApp={false}
          >
            <div className="top-half">
              <div className="top-half-padded">
                <div className="top-row">
                  <button onClick={this.closeModal} className="x-btn">&times;</button>
                  <h2>Create new tag</h2>
                </div>
                <div className="notebook-input">
                  <label> Name </label>
                  <input type="text" placeholder="Tag name" value={this.state.name} onChange={this.update('name')} />
                </div>
              </div>
            </div>
            <div className="modal-btns">
              <button onClick={this.closeModal} className="cancel-btn">Cancel</button>
              <button className="continue-btn" onClick={this.handleSubmit}>Done</button>
            </div>
          </Modal>
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