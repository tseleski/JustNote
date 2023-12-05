# JustNote 

JustNote is a single-page clone of [Evernote](https://evernote.com/), a web application used to create and edit rich text formatted notes to help you stay on top of all the many parts of your life!

## Home Page
![homePage](app/assets/images/home_page.png)


# Key Features
## User Authentication

Users can easily and securely log in or sign up to access their account.

<img src="https://github.com/tseleski/JustNote/blob/master/app/assets/images/sign_up.png" width="60%">

## Notes

Users can organize their thoughts into notes that they can create, edit, and delete. They can format their text using rich text formatting.

### Auto-save

As users edit a note, the note automatically saves, without the user having to press any button. Every change is tracked, making for easy and simple use.

## Notebooks

Users can organize their notes into notebooks. Notebooks can be created, renamed, and deleted. Users can filter notes based on a notebook.


## Tags

Users can place multiple tags on notes. They can remove tags from individual notes, or delete a tag from all their notes. They can filter notes based on a tag.

![tags](app/assets/images/tags.png)

> To make dropdown menus (like the "remove tag" one above) disappear on a click outside of the component, I used the following code:

```javascript

togglePopup(e) {
    e.stopPropagation();
    this.setState({ deletePopup: !this.state.deletePopup });
  }

  closePopup() {
    this.setState({ deletePopup: false });
  }

  //..

  render(){
    const popup = this.state.deletePopup ? "show" : "hide";
    return (
      <div className="tag-form-list-item" onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0">
        <div className="tag-relative">
          <div className="tag-name">{this.props.tag.name}
            <div className="caret-container">
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>
      // Additional component rendering
    )
  }

  ```

## Search

Depending which page a user is currently on, a user can search the notes they are looking at. For example, if the user is currently looking at all the notes in a particular notebook, they can type into the search bar, that searches on each key stroke, to filter their notes.

## Easy UI

React and Redux create a simple and intuitive user interface. Users can easily navigate to where they want to go.

## Technologies Used

* Ruby on Rails
* PostgreSQL
* React.js and Redux
* Javascript (ES6)
* HTML and CSS

### Future Features

* Shortcuts to specific notes
* Users will be able to move notes to the trash. From the trash, users can choose to either restore a note or permanently delete it
