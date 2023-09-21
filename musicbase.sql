CREATE DATABASE test_database

USE test_database


CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    birthdate DATE,
    genres VARCHAR(50),
    shortDescription TEXT,
    images VARCHAR(255)
);

CREATE TABLE album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    releaseDate DATE
);

CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    releaseDate DATE,
    length VARCHAR(8)
);


CREATE TABLE artists_songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT,
    song_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

CREATE TABLE albums_songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id INT,
    song_id INT,
    position INT,
    FOREIGN KEY (album_id) REFERENCES album(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

INSERT INTO artists (name, birthdate, genres, shortDescription, images) VALUES ('Eminem', '1972-10-17', 'Rap', 'American rapper, songwriter, and record producer', 'eminem.jpg'),
    ('Stormzy', '1993-07-26', 'Grime, Rap', 'British rapper and songwriter', 'stormzy.jpg'),
    ('Skepta', '1982-09-19', 'Grime, Rap', 'English rapper, songwriter, and record producer', 'skepta.jpg'),
    ('Little Simz', '1994-02-23', 'Rap', 'English rapper and musician', 'little_simz.jpg'), ('Adele', '1988-05-05', 'Soul, Pop', 'English singer-songwriter known for her powerful vocals', 'adele.jpg'),
    ('Shakira', '1977-02-02', 'Latin, Pop', 'Colombian singer, songwriter, and dancer', 'shakira.jpg'),
    ('Ed Sheeran', '1991-02-17', 'Pop', 'English singer-songwriter and musician', 'ed_sheeran.jpg'),
    ('BTS', '1993-12-30', 'K-pop', 'South Korean boy band known for their global popularity', 'bts.jpg'), ('Michael Jackson', '1958-08-29', 'Pop', 'American singer, songwriter, and dancer', 'michael_jackson.jpg'),
    ('Bob Marley', '1945-02-06', 'Reggae', 'Jamaican reggae icon', 'bob_marley.jpg'), ('Burna Boy', '1991-07-02', 'Afro-fusion, Reggae', 'Nigerian singer and songwriter known for his Afro-fusion music', 'burna_boy.jpg');

-- Insert three songs from "Gang Signs & Prayer" album by Stormzy into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Big for Your Boots', '2017-02-03', '3:59'),
    ('Shut Up', '2015-09-13', '3:02'),
    ('Blinded by Your Grace, Pt. 2', '2017-02-03', '3:51');

INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (1, (SELECT id FROM songs WHERE title = 'Big for Your Boots')),
    (1, (SELECT id FROM songs WHERE title = 'Shut Up')),
    (1, (SELECT id FROM songs WHERE title = 'Blinded by Your Grace, Pt. 2'));


-- DET HER ER MÅDEN MAN SLETTER SPECIFIKKE ROWS MED PRIMARY ID'S
-- DELETE FROM artists_songs WHERE id = 6;

-- Insert three songs from "The Eminem Show" album by Eminem into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Without Me', '2002-05-14', '4:50'),
    ('Cleanin'' Out My Closet', '2002-05-14', '4:57'),
    ('Sing for the Moment', '2002-05-14', '5:39');

-- Indsæt data i artists_songs-tabellen for at forbinde Eminem med de tre sange fra "The Eminem Show" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (2, (SELECT id FROM songs WHERE title = 'Without Me')),
    (2, (SELECT id FROM songs WHERE title = 'Cleanin'' Out My Closet')),
    (2, (SELECT id FROM songs WHERE title = 'Sing for the Moment'));


-- Insert three songs from "Konnichiwa" album by Skepta into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Shutdown', '2016-04-08', '3:08'),
    ('Man (Gang)', '2016-04-08', '3:34'),
    ('Crime Riddim', '2016-04-08', '3:40');

-- Indsæt data i artists_songs-tabellen for at forbinde Skepta med de tre sange fra "Konnichiwa" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (3, (SELECT id FROM songs WHERE title = 'Shutdown')),
    (3, (SELECT id FROM songs WHERE title = 'Man (Gang)')),
    (3, (SELECT id FROM songs WHERE title = 'Crime Riddim'));


-- Insert three songs from "Grey Area" album by Little Simz into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Offence', '2019-03-01', '3:06'),
    ('Boss', '2019-03-01', '2:33'),
    ('Venom', '2019-03-01', '3:03');

-- Indsæt data i artists_songs-tabellen for at forbinde Little Simz med de tre sange fra "Grey Area" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (4, (SELECT id FROM songs WHERE title = 'Offence')),
    (4, (SELECT id FROM songs WHERE title = 'Boss')),
    (4, (SELECT id FROM songs WHERE title = 'Venom'));


-- Insert three songs from "25" album by Adele into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Hello', '2015-10-23', '4:55'),
    ('When We Were Young', '2015-10-23', '4:51'),
    ('Send My Love (To Your New Lover)', '2015-10-23', '3:43');


-- Indsæt data i artists_songs-tabellen for at forbinde Adele med de tre sange fra "25" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (5, (SELECT id FROM songs WHERE title = 'Hello')),
    (5, (SELECT id FROM songs WHERE title = 'When We Were Young')),
    (5, (SELECT id FROM songs WHERE title = 'Send My Love (To Your New Lover)'));

-- Insert three songs from "Laundry Service" album by Shakira into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Whenever, Wherever', '2001-09-25', '3:16'),
    ('Underneath Your Clothes', '2001-09-25', '3:45'),
    ('Objection (Tango)', '2001-09-25', '3:43');

-- Indsæt data i artists_songs-tabellen for at forbinde Shakira med de tre sange fra "Laundry Service" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (6, (SELECT id FROM songs WHERE title = 'Whenever, Wherever')),
    (6, (SELECT id FROM songs WHERE title = 'Underneath Your Clothes')),
    (6, (SELECT id FROM songs WHERE title = 'Objection (Tango)'));

-- Insert three songs from "Divide" album by Ed Sheeran into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Shape of You', '2017-01-06', '3:53'),
    ('Castle on the Hill', '2017-01-06', '4:21'),
    ('Galway Girl', '2017-01-06', '2:50');

-- Indsæt data i artists_songs-tabellen for at forbinde Ed Sheeran med de tre sange fra "Divide" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (7, (SELECT id FROM songs WHERE title = 'Shape of You')),
    (7, (SELECT id FROM songs WHERE title = 'Castle on the Hill')),
    (7, (SELECT id FROM songs WHERE title = 'Galway Girl'));


-- Insert three songs from "Love Yourself: Tear" album by BTS into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Fake Love', '2018-05-18', '4:02'),
    ('Singularity', '2018-05-18', '3:16'),
    ('The Truth Untold', '2018-05-18', '4:02');

-- Indsæt data i artists_songs-tabellen for at forbinde BTS (kunstner ID 8) med de tre sange fra "Love Yourself: Tear" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (8, (SELECT id FROM songs WHERE title = 'Fake Love')),
    (8, (SELECT id FROM songs WHERE title = 'Singularity')),
    (8, (SELECT id FROM songs WHERE title = 'The Truth Untold'));

-- Insert three songs from "Thriller" album by Michael Jackson into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Thriller', '1982-11-30', '5:58'),
    ('Billie Jean', '1982-11-30', '4:53'),
    ('Beat It', '1982-11-30', '4:18');

-- Indsæt data i artists_songs-tabellen for at forbinde Michael Jackson (kunstner ID 9) med de tre sange fra "Thriller" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (9, (SELECT id FROM songs WHERE title = 'Thriller')),
    (9, (SELECT id FROM songs WHERE title = 'Billie Jean')),
    (9, (SELECT id FROM songs WHERE title = 'Beat It'));


-- Insert three songs from "Exodus" album by Bob Marley into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Jamming', '1977-06-03', '3:31'),
    ('One Love / People Get Ready', '1977-06-03', '2:52'),
    ('Three Little Birds', '1977-06-03', '3:00');

-- Indsæt data i artists_songs-tabellen for at forbinde Bob Marley (kunstner ID 10) med de tre sange fra "Exodus" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (10, (SELECT id FROM songs WHERE title = 'Jamming')),
    (10, (SELECT id FROM songs WHERE title = 'One Love / People Get Ready')),
    (10, (SELECT id FROM songs WHERE title = 'Three Little Birds'));

-- Insert three songs from "Love, Damini" album by Burna Boy into the songs table
INSERT INTO songs (title, releaseDate, length)
VALUES
    ('Ye', '2022-01-01', '3:54'),
    ('Last Last', '2022-01-01', '3:49'), -- Replaced 'Dangote' with 'Last Last'
    ('Gbona', '2022-01-01', '3:08');

-- Indsæt data i artists_songs-tabellen for at forbinde Burna Boy (kunstner ID 11) med de tre sange fra "Love, Damini" album
INSERT INTO artists_songs (artist_id, song_id)
VALUES
    (11, (SELECT id FROM songs WHERE title = 'Ye')),
    (11, (SELECT id FROM songs WHERE title = 'Last Last')),
    (11, (SELECT id FROM songs WHERE title = 'Gbona'));

-- Indsæt albumoplysninger for forskellige artister i albumtabellen
INSERT INTO album (title, releaseDate)
VALUES
    ('Love Yourself: Tear', '2018-05-18'),
    ('Divide', '2017-03-03'),
    ('Thriller', '1982-11-30'),
    ('Exodus', '1977-06-03'),
    ('Love, Damini', '2022-01-01'),
     ('Laundry Service', '2001-11-13'),
    ('Konnichiwa', '2016-05-06'),
    ('Gang Signs and Prayers', '2017-02-24'),
    ('Grey Area', '2019-03-08'),
    ('25', '2015-11-20'),
    ('The Eminem Show', '2002-05-26');


-- Indsæt forbindelser mellem album og sange med album_id 1 og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (1, (SELECT id FROM songs WHERE title = 'Fake Love'), 1),
    (1, (SELECT id FROM songs WHERE title = 'Singularity'), 2),
    (1, (SELECT id FROM songs WHERE title = 'The Truth Untold'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 2 (Divide) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (2, (SELECT id FROM songs WHERE title = 'Shape of You'), 1),
    (2, (SELECT id FROM songs WHERE title = 'Castle on the Hill'), 2),
    (2, (SELECT id FROM songs WHERE title = 'Galway Girl'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 3 (Thriller) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (3, (SELECT id FROM songs WHERE title = 'Thriller'), 1),
    (3, (SELECT id FROM songs WHERE title = 'Billie Jean'), 2),
    (3, (SELECT id FROM songs WHERE title = 'Beat It'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 4 (Exodus) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (4, (SELECT id FROM songs WHERE title = 'Jamming'), 1),
    (4, (SELECT id FROM songs WHERE title = 'One Love / People Get Ready'), 2),
    (4, (SELECT id FROM songs WHERE title = 'Three Little Birds'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 5 (Love, Damini) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (5, (SELECT id FROM songs WHERE title = 'Ye'), 1),
    (5, (SELECT id FROM songs WHERE title = 'Last Last'), 2),
    (5, (SELECT id FROM songs WHERE title = 'Gbona'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 6 (Laundry Service) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (6, (SELECT id FROM songs WHERE title = 'Whenever, Wherever'), 1),
    (6, (SELECT id FROM songs WHERE title = 'Underneath Your Clothes'), 2),
    (6, (SELECT id FROM songs WHERE title = 'Objection (Tango)'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 7 (The Eminem Show) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (7, (SELECT id FROM songs WHERE title = 'Without Me'), 1),
    (7, (SELECT id FROM songs WHERE title = 'Sing for the Moment'), 2),
    (7, (SELECT id FROM songs WHERE title = 'Cleanin Out My Closet'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 8 (25) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (8, (SELECT id FROM songs WHERE title = 'Hello'), 1),
    (8, (SELECT id FROM songs WHERE title = 'Send My Love (To Your New Lover)'), 2),
    (8, (SELECT id FROM songs WHERE title = 'When We Were Young'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 10 (Konnichiwa) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (7, (SELECT id FROM songs WHERE title = 'Konnichiwa'), 1),
    (7, (SELECT id FROM songs WHERE title = 'Lyrics'), 2),
    (7, (SELECT id FROM songs WHERE title = 'Crime Riddim'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 11 (Exodus) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (9, (SELECT id FROM songs WHERE title = 'Jamming'), 1),
    (9, (SELECT id FROM songs WHERE title = 'One Love / People Get Ready'), 2),
    (9, (SELECT id FROM songs WHERE title = 'Three Little Birds'), 3);

-- Indsæt forbindelser mellem album og sange med album_id 12 (Gang Signs and Prayers) og tilfældige positioner
INSERT INTO albums_songs (album_id, song_id, position)
VALUES
    (8, (SELECT id FROM songs WHERE title = 'Big for Your Boots'), 1),
    (8, (SELECT id FROM songs WHERE title = 'Shut Up'), 2),
    (8, (SELECT id FROM songs WHERE title = 'Blinded by Your Grace, Pt. 2'), 3);
