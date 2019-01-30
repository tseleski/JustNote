import { connect } from 'react-redux';
import { fetchTags, deleteTag } from '../../actions/tag_actions';
import TagIndex from './tag_index';

const mapStateToProps = state => {
  return {
    tags: Object.values(state.entities.tags)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    deleteTag: (id) => dispatch(deleteTag(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);