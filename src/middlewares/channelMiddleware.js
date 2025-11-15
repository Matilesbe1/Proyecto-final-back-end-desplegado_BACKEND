import ChannelRepository  from "../repositories/channel.repository.js"
import { ServerError } from "../error.js"

async function channelMiddleware(request, response, next) {
    try {
        const { workspace_selected, member, user } = request
        const { channel_id } = request.params
        const workspace_id = String(request.params.workspace_id).trim();


        const channel_selected = await ChannelRepository.getByIdAndWorkspaceId(workspace_id, channel_id)
        if (!channel_selected) {
            throw new ServerError(404, 'Channel no encontrado')
        }
        request.channel_selected = channel_selected
        next()
    }
    catch (error) {
        if (error.status) {
            return response.status(error.status).json({
                ok: false,
                message: error.message,
                status: error.status
            })
        }
        else {
            console.error(
                'ERROR en ChannelMiddleware', error
            )
            return response.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
                status: 500
            })
        }
    }
}

export default channelMiddleware