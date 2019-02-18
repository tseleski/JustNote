import { connect } from 'react-redux';
import { fetchTags, deleteTag, clearTags, createTag } from '../../actions/tag_actions';
import TagIndex from './tag_index';

const mapStateToProps = state => {
  function sortFunction(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }
  const sorted_tags = Object.values(state.entities.tags).sort(sortFunction);
  return {
    tags: sorted_tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    deleteTag: (id) => dispatch(deleteTag(id)),
    clearTags: () => dispatch(clearTags()),
    createTag: tag => dispatch(createTag(tag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);