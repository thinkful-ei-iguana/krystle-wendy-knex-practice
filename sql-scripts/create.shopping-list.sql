CREATE TABLE
IF NOT EXISTS shopping_list
(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    category grocery NOT NULL,
    price decimal
(12,2) NOT NULL,
    checked BOOLEAN DEFAULT FALSE,
    date_added TIMESTAMP DEFAULT now
() NOT NULL
);

DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM
(
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);
