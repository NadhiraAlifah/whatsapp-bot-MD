//THIS SOURCE CODE IS FREE
//CREATED BY ALVIO ADJI JANUAR

const fs = require('fs-extra')
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage } = require("@adiwajshing/baileys-md")
const { state, saveState } = useSingleFileAuthState(`./bot.json`)
const pino = require('pino')
                      

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
        const dataadmin = JSON.parse(fs.readFileSync('./admin.json')
        const cf = JSON.parse(fs.readFileSync('./config.json'))
        const { admin1 } = dataadmin
        const { mt } = config
        
        const reply = (teks) => {
        conn.sendMessage(from, {text : teks}, { quoted: m})
        }
        
        function banChat() {
        if (mt == true) {
          return false
        } else {
          return true
        }
        }

        
        switch(command){
          case 'mt':
          if (from === admin1){
          if (cf.mt === false) return
          cf.mt  = false
          mt  = false
          fs.writeFileSync('config.json' , JSON.stringify(cf)) 
          reply('Sukses Maintance')
          }
          break
            
          case 'mte':
          if (from === admin1){
          if (cf.mt === true) return
          cf.mt  = true
          mt  = true
          fs.writeFileSync('config.json' , JSON.stringify(cf))
          reply('Sukses Unmaintance') 
          }
          break
        }
          textban = 'Maaf bot sedang Maintance'
          if (banChat()) return reply(textban)
          
          if (body === 'halo'){
          reply('halo juga kak')
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
