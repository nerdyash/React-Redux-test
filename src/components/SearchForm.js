import React, { Component } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { searchPost } from '../actions/postAction';

class SearchForm extends Component {
    componentWillMount() {
        // this.props.resetPosts();
    }

    render() {
        const { searchPost, searchValue} = this.props;
        return (
            <div>
                <h2>Search Post</h2>
                <form>
                    <input name='search' onChange={(e) => searchPost(e.target.value)} value={searchValue} /> <br/><br/>
                    <button type="submit" className='btn'>Reset Posts</button>
                </form>
            </div>
        )
    }
}

SearchForm.propTypes = {

}

const mapStateToProps = state => ({
    searchValue: state.posts.searchValue,
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchPost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);