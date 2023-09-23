
import * as os from 'os';
import 'dotenv/config'
import Airtable from 'airtable'



const apiKey = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.BASE_ID;


const base = new Airtable({apiKey}).base(BASE_ID);

async function logSystemInfo() {
    const osType = os.type();
    const osPlatform = os.platform();
    const osRelease = os.release();
    try {
      await base('Table 1').create([
        {
            fields: {
                'OS Type': osType,
                'OS Platform': osPlatform,
                'OS Release': osRelease,
                'Timestamp': new Date().toISOString()
            }
        }
    ])
  
    } catch (error) {
        console.error('Error logging system info to Airtable:', error);
    }
}

logSystemInfo();
