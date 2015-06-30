r_names = [
  'Ghandi Indian Cuisine',
  'Mean Bao',
  'North of Brookly Pizzeria',
  "The Burger's Priest",
  'Fresh Off The Boat'
]

d = []

d[0] = [
  'Potato Roti',
  'Channa Roti',
  'Spinach with Potato Roti',
  'Cauliflower with Potato Roti',
  'Eggplant with Potato Roti',
  'Mix Vegetable Roti',
  'Daal Tadka Roti',
  'Vegetable Korama Roti',
  'Mutter Paneer Roti',
  'Saag Paneer Roti',
  'Daal Korma Roti',
  'Saag Kofta Roti',
  'Malai Kofta Roti',
  'Paneer Tikka Masala Roti',
  'Chicken Roti',
  'Butter Chicken Roti',
  'Lamb Roti',
  'Shrimp Roti',
  'Chicken Jalfrizi Roti',
  'Chicken Tikka Masala Roti',
  'Chicken Malai KOfta Roti',
  'Chicken Vindaloo Roti',
  'Chicken Korma Roti',
  'Madras Chicken Roti',
  'Vegetable Samosa',
  'Vegatable Pakora',
  'Butter Chicken Roll',
  'Chaat Papri',
  'Mix Vegetable Curry with Rice',
  'Chicken Curry with Rice',
  'Butter Chicken Curry with Rice',
  'Chicken Vindaloo Curry with Rice',
  'Lamb Curry with Rice',
  'Mix Vegetable Biryani',
  'Chicken Biryani',
  'Lamb Biryani',
  'Plain Roti',
  'Plain Rice',
  'Gulabjaman',
  'Raita',
  'Mango Lassi',
  'Plain Lassi'
] 

d[1] = [
  ['Pork Belly Bao', 'cucumber, hoisin sauce'],
  ['Chicken Bao', 'takuan, red pepper'],
  ['Braised Beef Bao', 'bok choy, taiwanese pickle'],
  ['Pulled Pork Bao', 'apple slaw'],
  ['Tofu & Enoki Mushroom Bao', 'carrot, red cabbage, sesame, satay sauce (V)'],
  ['Sloppy Jones Bao', 'cucumber, green onion'],
  ['Siu Mai', ''],
  ['Shrimp Dumplings', ''],
  ['Pork Dumplings', 'red cabbage'],
  ['Pork & Shrimp Dumplings', 'carrot, cilantro, green onion'],
  ['Tofu Pockets', 'shiitake mushroom, edamame, spinach, caramelized onion (V)'],
  ['Sticky Quinoa', 'chicken, lap cheong']
]

d[2] = [
  ['Margherita', 'Sauce, Mozzarella, Basil'],
  ['Pepperoni', 'Sauce, Mozzarella, Pepperoni, Oregano'],
  ['White', 'Mozzarella, Garlic Ricotta, Arugula'],
  ['Puttanesca', 'Hand-Crushed Sauce, Mozzarella, Olives, Scalions, Capers, Anchovies'],
  ['Garlic Knots', 'Like Garlic Bread, Just Better'],
  ['Roasted Garlic Dip', '']
]

d[3] = [
  ['Double Cheeseburge', ''],
  ['Cheeseburger', ''],
  [
    "The \"Option\"",
    'This is our vegetarian option. ' \
    'A custom blend of cheesy goodness sandwiched between Two Roasted portabello mushrooms. ' \
    'breaded and deep fried then placed on a bun with your choice of toppings'
  ],
  ['The Priest', 'Cheeseburger + The Option'],
  ['Magnum', 'Blue Cheeseburger with Bacon'],
  ['The Vatican City', 'Double Cheeseburger Squeezed Between Two Grilled Cheese Buns'],
  ['Red Sea', 'Cheeseburger With Chili On Top'],
  ["\"What's Right\"", ''],
  ['Fries', ''],
  ['Chili Cheese Fries', ''],
  ['Cookies', ''],
  ['Jarge-Style Shake', 'Vanilla Choc Straw Shake'],
  ['Riggs and Murtaugh', 'Black and White Shake'],
  ['The Four Horsement of the Apocalypse', "A \"Vatican-Style\" Armageddon"],
  ['Blue Steel', 'Blue Cheeseburger'],
  ['Jarge-Style', 'Mustard-Grilled Patties with Fried Onions'],
  ['Religious Hypocrite', 'The Option (Veggie Burger) with Bacon'],
  ["Noah's Ark", 'The Option (Veggie Burger) with Chili and Cheese'],
  ['Armageddon', 'Judgement Day with an Extra Patty'],
  ['Judgement Day', 'The Priest with an Extra Option'],
  ['Tower of Babel', "A \"Vatican Style\" Pope"],
  ['The Pope', 'The Priest with an Extra Patty'],
  ['Holy Smokes', 'Double Cheeseburge Topped with Panko-Crusted Deep-Fried Jaapenos']
]

d[4] = [
  ['Lobster Rolls', 'Maine Style served with fresh cut fries & broccoli house slaw'],
  ['Softshell Crab Sandwich', 'Our famous softshell crab sandwich served with fresh cut fries and broccoli house slaw'],
  ['Meiterranean Shrimp Sandwich',
    'Sauteed shrimp in our seasoned tomato sauce with basil and feta served with our fresh cut fries and broccoli house slaw'],
  [
    'The FOB',
    'Our version of an asian poboy banh mi, battered catfish, kimchi and burned aioli.' \
    'Not for the timid served with our broccoli house slaw and fresh cut fries (with a bit of heat)'
  ],
  [
    'Frisco Fries',
    'Our fresh cut seasoned fries with house made garlic aioli topped ' \
    'with mounds of fresh snow crab and garnished with fresh dill and parsley'
  ],
  ['Fish & Chips (Halibut Only)', 'Nuff said. Served with our fresh cut fries, house tartar sauce and broccoli slaw'],
  ['Grilled Halibut', ''],
  ['Grilled Mahi Mahi', ''],
  ['Grilled Catfish', ''],
  ['Grilled Halibut Sandwich', ''],
  ['Grilled Mahi Mahi Sandwich', ''],
  ['Grilled Catfish Sandwich', ''],
  [
    'Fu-Schnicken',
    'Our interpretation of an asian surf & turf sandwich. ' \
    'Thinly sliced beef in a Korean inspired marinade coupled with succulent tiger shrimps, ' \
    'kimchi & our house made bird aioli on a toasted badass bun, suerved with our fresh cut fries and broccoli slaw'
    ],
  ['Seafood Chowder (Seasonal)', 'Mussels clams shrimp squid and crabs. Comes with a bit of kick']
]

r = []
r_names.each_with_index { | item , index | r[index] = Restaurant.create(name: item) }

d[0].each { | x | r[0].dishes.create(name: x) }

4.times do | y | 
  d[y + 1].each { | x | r[y + 1].dishes.create(name: x[0], description: x[1]) }
end
