import ChannelRepository from '../repositories/channel.repository.js'

class ChannelService{
    static async getAllByWorkspaceId(workspace_id){
        const channels = await ChannelRepository.getAllByWorkspaceId(workspace_id)
        return channels
    }
}

export default ChannelService