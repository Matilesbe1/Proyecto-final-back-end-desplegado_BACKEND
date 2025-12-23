import ChannelRepository from '../repositories/channel.repository.js'

class ChannelService{

    static async create (workspace_id, name){
        await ChannelRepository.create( workspace_id, name)
        return await ChannelRepository.getAllByWorkspaceId(workspace_id)
    }
    static async getAllByWorkspaceId(workspace_id){
        const channels = await ChannelRepository.getAllByWorkspaceId(workspace_id)
        return channels
    }
}

export default ChannelService