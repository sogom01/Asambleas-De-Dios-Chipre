import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send', async (req, res) => {
    const { name, phone, request } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'jsogfd@gmail.com',
        subject: 'Nueva Petición de Oración',
        text: `Nombre: ${name}\nTeléfono: ${phone}\nPetición: ${request}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Petición enviada con éxito');
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
        res.status(500).send('Error al enviar el correo');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
