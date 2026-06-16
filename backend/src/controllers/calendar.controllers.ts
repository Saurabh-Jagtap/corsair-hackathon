import type {Request, Response} from 'express'
import { getCalendarEventService } from '../services/calendar.services.js'

export const getCalendarEvents = async(req:Request, res:Response) => {
    try {
        const calendarEvents = await getCalendarEventService("dev")
    
        return res.status(200).json({success: true, data: calendarEvents})
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch Events",
        });
    }
}