import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Real-time educational notifications & alerts for Maharashtra Schools
const LIVE_NOTIFICATIONS = [
  {
    id: 'notif_1',
    category: 'परिपत्रक',
    priority: 'उच्च',
    title: 'महाराष्ट्र राज्य मंडळ: इयत्ता १० वी परीक्षा अर्ज व शुल्काबाबत अंतिम मुदत',
    date: 'आज, ११:३० AM',
    source: 'महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ, पुणे',
    summary: 'सत्र २०२६-२७ च्या माध्यमिक शालान्त प्रमाणपत्र (SSC) परीक्षेसाठी नियमित विद्यार्थ्यांचे ऑनलाईन अर्ज व शुल्क भरण्याची अंतिम मुदत २५ ऑक्टोबर २०२६ पर्यंत वाढविण्यात आली आहे.',
  },
  {
    id: 'notif_2',
    category: 'मूल्यमापन',
    priority: 'महत्त्वाचे',
    title: 'शासकीय आदेश: आकारिक मूल्यमापन (CCE) नोंदी अद्ययावत करणे',
    date: 'काल, ०४:१५ PM',
    source: 'शिक्षण संचालनालय (प्राथमिक व माध्यमिक), महाराष्ट्र राज्य',
    summary: 'इयत्ता ६ वी ते ८ वी करिता RTE कायद्यानुसार विद्यार्थ्यांच्या दैनंदिन निरीक्षण, तोंडी काम, प्रात्यक्षिक व प्रकल्प नोंदी शालेय अभिलेखात अद्ययावत ठेवाव्यात.',
  },
  {
    id: 'notif_3',
    category: 'शिष्यवृत्ती',
    priority: 'सामान्य',
    title: 'सावित्रीबाई फुले दत्तक पालक व माध्यमिक शिष्यवृत्ती पडताळणी',
    date: '१६ ऑक्टोबर, ०२:०० PM',
    source: 'जिल्हा परिषद शिक्षण विभाग, बुलढाणा',
    summary: 'सर्व मुख्याध्यापकांनी शिष्यवृत्तीधारक विद्यार्थ्यांचे आधार संलग्न बँक खाते पडताळणी विहित मुदतीत पूर्ण करून अहवाल सादर करावा.',
  },
  {
    id: 'notif_4',
    category: 'दिनविशेष',
    priority: 'माहिती',
    title: 'शालेय दिनविशेष: राष्ट्रीय विज्ञान दिन व स्पर्धा पूर्वतयारी',
    date: '१५ ऑक्टोबर, ०९:०० AM',
    source: 'शालेय उपक्रम कक्ष',
    summary: 'विद्यालयात विज्ञान प्रदर्शन व वक्तृत्व स्पर्धेची पूर्वतयारी सुरू झाली असून विज्ञान शिक्षकांनी प्रकल्प तयार करून घ्यावेत.',
  },
];

app.get('/api/notifications', (req, res) => {
  res.json({ success: true, notifications: LIVE_NOTIFICATIONS });
});

// Gemini AI Generator Endpoint
app.post('/api/generate-ai', async (req, res) => {
  try {
    const { task, prompt, customApiKey, systemInstruction } = req.body;
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'API Key उपलब्ध नाही. कृपया सेटिंग्जमध्ये तुमची Gemini API Key टाका किंवा सिस्टीम की वापरा.',
        fallback: true,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          systemInstruction ||
          'तुम्ही महाराष्ट्र राज्य शिक्षण मंडळाच्या अभ्यासक्रमानुसार कार्य करणारे तज्ञ मराठी शिक्षक व शासकीय पत्रलेखक आहात. शुद्ध, प्रमाण व शिस्तबद्ध मराठीत अचूक उत्तर द्या.',
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text,
      task,
    });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'AI निर्मिती दरम्यान तांत्रिक त्रुटी उद्भवली.',
    });
  }
});

// Serve Vite in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
