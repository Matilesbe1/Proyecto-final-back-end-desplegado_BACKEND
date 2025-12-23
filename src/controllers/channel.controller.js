import { response } from "express";
import ChannelService from "../services/channel.service.js";



class ChannelController {
    static async create(request, response) {
        try {
            const { workspace_selected } = request;
            const { name } = request.body;
            // Validar nombre de canal ok
            if (!name) {
                return response.status(400).json({
                    ok: false,
                    message: 'El nombre del canal es requerido',
                });
            }
            // Crear el canal usando .createChannel
            const channel_created = await ChannelService.create(workspace_selected.id, name);
            response.status(201).json({
                ok: true,
                message: 'Canal creado',
                status: 201,
                data: {
                    channels: channel_created
                }
            });
        } catch (error) {
            console.error('Error al crear:', error);
            response.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
            });
        }
    }
    static async getById(request, response ){
        const {workspace_selected, member, user} = request
        const channels = await ChannelService.getAllByWorkspaceId(workspace_selected.id) 
        response.status(200).json(
            {
                ok: true,
                status: 200,
                message: 'canales encontrados',
                data: {
                    channels: channels
                }
            }
        )
    }
}


export default ChannelController