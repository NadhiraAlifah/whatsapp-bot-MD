//THIS SOURCE CODE IS FREE
//CREATED BY ALVIO ADJI JANUAR

const fs = require('fs-extra')
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage } = require("@adiwajshing/baileys-md")
const { state, saveState } = useSingleFileAuthState(`./bot.json`)
const pino = require('pino')
const de = JSON.parse(fs.readFileSync('./database.json')
                      

async function start() {  
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Source-Code','Safari','1.0.0'],
        auth: state
    })
    
        conn.ev.on('messages.upsert', async chatUpdate => {
        const m = chatUpdate
        m = m.messages[0]
        if (!m.message) return
        if (m.key && m.key.remoteJid == 'status@broadcast') return;
        if (m.key.fromMe) return
        m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
        if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
        const type = Object.keys(m.message)[0] 
        const body = (type === 'conversation') ? m.message.conversation : (type == 'imageMessage') ? m.message.imageMessage.caption : (type == 'videoMessage') ? m.message.videoMessage.caption : (type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.title || m.text) : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        if (!body.startsWith('.')){
        if (type === 'conversation') {
        de.push(JSON.parse(JSON.stringify(m)))
        fs.writeFileSync('./database.json', JSON.stringify(de, null, 2))
        uer = de.length
        if (uer === 100) {
        de.splice(0, 100)
        fs.writeFileSync('./database.json', JSON.stringify(de, null, 2))
        }
        }
        }
          
       async function gettit (orang, _dir) {
       pe = []
       Object.keys(_dir).forEach((i) => {
       if (_dir[i].key.remoteJid === orang){
       pe.push(_dir[i])
       }
       })
       return pe
       }
       
      async function search(text,amount) {
      rese = await gettit(from,de)
      let gb = []
      let a = []
      for (var i = 0; i < rese.length; i++){
      a.push(rese[i])
      }
      for (let id of a){
      if (id.message.conversation && id.message.conversation.includes(text)){
      gb.push(id)
      }
      }
      result = gb.slice(0, amount)
      return result
      }
          
      switch(command){
      case 'search':
      const args = body.trim().split(/ +/).slice(1)
      const q = args.join(" ")
      if (!q) return await conn.sendMessage(from, {text: 'Caranya\n\n.search textnya berapa'} , {quoted : m})
      se = q
      se = se.split(' ')
      if (!se[1]) return await conn.sendMessage(from, {text: 'Berapa yang anda ingin cari ? \n silahkan ketik .search textnya berapa'} , {quoted : m})
      try {
      sear = await search(se[0],se[1])
      for (let i = 0; i < sear.length; i++){
      await conn.sendMessage(from, {text: 'Nih pesannnya'} , {quoted : sear[i]})
      }
      } catch (err) {
      await conn.sendMessage(from, {text: 'Pesan tidak di temukan'} , {quoted : m})
      }
      break
      }
      
    })


    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? start() : console.log('Koneksi Terputus...')
        }
        console.log('Koneksi Terhubung...')
    })
  
   conn.ev.on('creds.update', saveState)
  
  }
start()
