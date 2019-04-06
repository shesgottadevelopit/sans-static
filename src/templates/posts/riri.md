---
title: Rihanna is the fav
date: 1-29-2019
url: rihanna
article: rihanna
author: badgirlriri
description:
template:
layout: post
tags:
- fentyxsavage
- Legends
- Trailblazer
albums:
    - Loud
    - ANTI
    - Talk that Talk
collection:
    - album: Loud
      year: 2014
      certified: yes
    - name: ANTI
      cost: 2016
      color: hell yess
    - name: Talk that Talk
      cost: 2015
      color: yes yes
makeup:
    mac: ririheaux
    mac2: ririwoo
    fenty: stunna
---
# Heading 1 | page should start here 
## Sex with Me Lyrics

## YAML
This page returns this data from the frontmatter: i love you

```yaml
---
title: "Rihanna is the fav"
date: "1-29-2019"
url: "/articles/riri-sample"
author: badgirlriri
description:
template:
layout:
tags:
- fentyxsavage
- Legends
- Trailblazer
albums:
    - Loud
    - ANTI
    - Talk that Talk
collection:
    - album: Loud
      year: 2014
      certified: yes
    - name: ANTI
      cost: 2016
      color: hell yess
    - name: Talk that Talk
      cost: 2015
      color: yes yes
makeup:
    mac: ririheaux
    mac2: ririwoo
    fenty: stunna
---
```

```js
{ content: 'This is content',
  data:
   { foo: 'bar',
     title: 'Rihanna is the fav',
     date: '1-29-2019',
     url: '/articles/riri-sample',
     author: 'badgirlriri',
     description: null,
     template: null,
     layout: null,
     tags: [ 'fentyxsavage', 'Legends', 'Trailblazer' ],
     albums: [ 'Loud', 'ANTI', 'Talk that Talk' ],
     collection: [ [Object], [Object], [Object] ],
     makeup: { mac1: 'ririheaux', mac2: 'ririwoo', fenty: 'stunna' } },
  isEmpty: false,
  excerpt: '' }
```


### Albums
**The represents an array**
{% for album in file.data.albums %}
- {{ album }}
{% endfor %}

### Albums & Years
**The represents an object**
{% for each in page.albums %}
- {{ item.album }}
- {{ item.year }}
- {{ item.certified }}
{% endfor %}


### Chorus
Sex with me, so amazing
All this all hard work, no vacation
Stay up off my Instagram, pure temptation
Hit a switch on a fake nigga, like a station
Sex with me, so amazing
Sex with me, so amazing

### Verse 1
Vodka and water, and a lemon
And a few other things I can not mention
Oh-na-na-na-na
Five fingers on it (five fingers)
Hit it like you own it, I’mma hit it like I’m on it
Straight shots of the blue dot
(Shots, shots, shots, shots)
Baby, I’mma pick your poison
Oh-we, ah-yeah, you gon’ need it
I’m off that la-la
I’mma get it wet like jacuzzi, ah-yea

### Chorus 1
And sex with me, so amazing
All this all hard work, no vacation
Stay up off my Instagram, pure temptation
Sex with me, sex with me, sex with me
So amazing, so amazing, mmmm

### Verse 2
You know I got the sauce (sauce), you know I’m saucy
And it’s always wet, a bitch never ever had to use lip gloss on it
I’mma need you deeper than six, it's not a coffin
We’re not making love, tryna get nasty
Wrap up your drugs, come make me happy
Sex with me is amazing, with her it’ll feel alright
The sex doesn’t get any better, make it long, let it be all night
I know, I know, I make it hard to let go
Tonight, all night, I’m Monroe
Even if I’m alone

### Chorus
Sex with me, so amazing
All this all hard work, no vacation
Stay up off my Instagram, pure temptation
Hit a switch on a fake nigga, like stations
Sex with me, sex with me, sex with me
So amazing, so amazing, mmmm

### Outro
Sex with me, so amazing
Sex with me so amazing
(This is the best there is)

[Source](https://genius.com/Rihanna-sex-with-me-lyrics)
