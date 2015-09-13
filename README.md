# Websockets
# Shares data quickly and efficiently

npm install -S express socket.io


# Generate sample data

```
http://beta.json-generator.com/
```
[
  {
    'repeat:20': {
      userId: '{{index() + 1}}',
      messageId: '{{guid()}}',
      isActive: '{{bool()}}',
      userName: '{{firstName()}} {{surname()}}',
      content: {
        text: '{{lorem(1, "paragraphs")}}',
        link: 'http://gameofthrones.wikia.com/wiki'
      },
      likedBy: ['{{integer(1, 20)}}'],
      ts: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}'
    }
  }
]
