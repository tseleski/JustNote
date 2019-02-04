# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Notebook.destroy_all
Note.destroy_all
Tag.destroy_all
Tagging.destroy_all

u1 = User.create!({email: 'demouser@gmail.com', password: 'demouser'});
n1  = Notebook.create!({title: 'General', user_id: u1.id})
n2 = Notebook.create!({title: 'Other', user_id: u1.id})
# n3 = Notebook.create!({title: 'To do', user_id: u1.id})
n4 = Notebook.create!({title: 'Recipes', user_id: u1.id})

note1 = Note.create!({title: 'Things to do', content: "<p><s>Homework</s></p>", plain_text: "Homework", notebook_id: n1.id})
note2 = Note.create!({title: 'To buy for the party', content: "<ul><li>plates</li><li>cups</li><li>tablecloths</li></ul>", plain_text: "plates cups tablecloths", notebook_id: n1.id})
note3 = Note.create!({title: 'My favorite things', content: "<h1><span style='background-color: rgb(153, 51, 255); color: rgb(255, 255, 255);'>music</span></h1>", plain_text: "music", notebook_id: n2.id})
note4 = Note.create!({title: 'Lasagna', content: "<ul><li>12 lasagna noodles</li><li>1 can marinara sauce</li><li>2 cups shredded cheese</li><li>3 tbsp ricotta cheese</li><li>Parmesan cheese</li></ul>", 
  plain_text: "12 lasagna noodles 1 can marinara sauce 2 cups shredded cheese 3 tbsp ricotta cheese Parmesan cheese", notebook_id: n4.id})
note5 = Note.create!({title: 'Cheescake Recipe', content: "<ul><li>4 (8 ounce) packages Cream Cheese, room temperature </li><li>1 cup granulated sugar </li><li>1/2 cup sour cream, room temperature </li><li>2 teaspoons vanilla</li><li>3 eggs, room temperature</li></ul>", 
  plain_text: "4 (8 ounce) packages Cream Cheese, room temperature
  1 cup granulated sugar
  1/2 cup sour cream, room temperature
  2 teaspoons vanilla
  3 eggs, room temperature", notebook_id: n4.id})
note6 = Note.create!({title: "Tags",
 content:
  "<h1 class=\"ql-align-center\">Users can add tags to any note.</h1><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><br></p><h2 class=\"ql-align-center\">Just type below and hit enter!</h2><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><br></p><h3 class=\"ql-align-center\"><span style=\"color: rgb(0, 71, 178);\">Tags can be removed easily by clicking on the down arrow of a tag. Enjoy!</span></h3>",
  plain_text:
  "Users can add tags to any note.\n\n\nJust type below and hit enter!\n\n\n\nTags can be removed easily by clicking on the down arrow of a tag. Enjoy!",
  notebook_id: n1.id})

tag1 = Tag.create!(name: "delicious", user_id: u1.id)
tag2 = Tag.create!(name: "yummy", user_id: u1.id)
tag3 = Tag.create!(name: "dairy", user_id: u1.id)
tag4 = Tag.create!(name: "easy", user_id: u1.id)
tag5 = Tag.create!(name: "important", user_id: u1.id)
tag6 = Tag.create!(name: "urgent", user_id: u1.id)
tag7 = Tag.create!(name: "random", user_id: u1.id)
tag8 = Tag.create!(name: "useful", user_id: u1.id)

Tagging.create!(note_id: note4.id, tag_id: tag1.id)
Tagging.create!(note_id: note4.id, tag_id: tag2.id)
Tagging.create!(note_id: note4.id, tag_id: tag3.id)
Tagging.create!(note_id: note4.id, tag_id: tag4.id)

Tagging.create!(note_id: note5.id, tag_id: tag1.id)
Tagging.create!(note_id: note5.id, tag_id: tag2.id)
Tagging.create!(note_id: note5.id, tag_id: tag3.id)
Tagging.create!(note_id: note5.id, tag_id: tag4.id)

Tagging.create!(note_id: note1.id, tag_id: tag5.id)
Tagging.create!(note_id: note2.id, tag_id: tag5.id)

Tagging.create!(note_id: note1.id, tag_id: tag6.id)
Tagging.create!(note_id: note2.id, tag_id: tag6.id)

Tagging.create!(note_id: note3.id, tag_id: tag7.id)

Tagging.create!(note_id: note6.id, tag_id: tag8.id)
Tagging.create!(note_id: note6.id, tag_id: tag4.id)

