require('dotenv').config();

class BolsaSantiago {
    constructor() {
        this.TOKEN = process.env.TOKEN;
        this.url = process.env.BolsaSantiagoURL;
    }

    async obtenerInstrumentosDispobibles() {
        const url = `${this.url}/consulta/InstrumentosDisponibles/getInstrumentosValidos?access_token=${this.TOKEN}`;

        try {
            const response = await fetch(url, {
                method: 'POST', // As per your headers, the method is POST
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}) // Empty payload as per your provided details
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    async obtenerResumenInstrumento(idInstrumento) {
        const url = `${this.url}/consulta/TickerOnDemand/getResumenAccion?access_token=${this.TOKEN}`;

        try {
            const response = await fetch(url, {
                method: 'POST', // As per your headers, the method is POST
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Nemo": idInstrumento
                }) 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
}

module.exports = BolsaSantiago;