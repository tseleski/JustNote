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

u1 = User.create!({email: 'demouser@gmail.com', password: 'demouser'});
n1  = Notebook.create!({title: 'General', user_id: u1.id})
Notebook.create!({title: 'Other', user_id: u1.id})
Notebook.create!({title: 'To do', user_id: u1.id})
Notebook.create!({title: 'School', user_id: u1.id})

note1 = Note.create!({title: 'Things to do', content: "<p><s>Homework</s></p>", plain_text: "Homework", notebook_id: n1.id})
note2 = Note.create!({title: 'My favorite things', content: "<h1><span style='background-color: rgb(153, 51, 255); color: rgb(255, 255, 255);'>music</span></h1>", plain_text: "music", notebook_id: n1.id})
note3 = Note.create!({title: 'Cheescake Recipe', content: "<ul><li>4 (8 ounce) packages Cream Cheese, room temperature </li><li>1 cup granulated sugar </li><li>1/2 cup sour cream, room temperature </li><li>2 teaspoons vanilla</li><li>3 eggs, room temperature</li></ul>", 
plain_text: "4 (8 ounce) packages Cream Cheese, room temperature
1 cup granulated sugar
1/2 cup sour cream, room temperature
2 teaspoons vanilla
3 eggs, room temperature", notebook_id: n1.id})

tag1 = Tag.create!(name: "funny", user_id: u1.id)
tag2 = Tag.create!(name: "hilarious", user_id: u1.id)
tag3 = Tag.create!(name: "remember", user_id: u1.id)
tag4 = Tag.create!(name: "favorite", user_id: u1.id)

