
import MemberWorkspace from "../models/MemberWorkspace.model.js"
import WorkspaceService from "../services/workspace.service.js"
import mailTransporter from "../config/mailTransporter.config.js"
import jwt from 'jsonwebtoken'
import UserRepository from "../repositories/user.repository.js"
import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import workspaceMiddleware from "../middlewares/workspaceMiddleware.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import ChannelService from "../services/channel.service.js"


class WorkspaceController {
    static async getAll(request, response) {

        try {
            const user = request.user
            const workspaces = await WorkspaceService.getAll(user.id)


            response.status(200).json(
                {
                    ok: true,
                    status: 200,
                    message: 'espacios de trabajdo conseguidos excitosamente',
                    data: {
                        workspaces: workspaces
                    }
                }
            )
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR AL REGISTRAR', error
                )
                response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }
    static async create(request, response) {
        try {
            const user = request.user
            const {name, url_image} = request.body

            const worksapce_created = await WorkspaceService.create(user.id, name, url_image)

            response.status(201).json({
                ok: true,
                status: 201,
                message: 'espacio de trabajo creado con exito',
                data: {
                    workspaces: worksapce_created
                }
            })
        }
        catch (error) {
            console.error(
                'ERROR AL REGISTRAR', error
            )
            response.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
                status: 500
            })
        }
    }

    static async invite(request, response) {
        try {
            const [member, workspace_selected, user] = request
            const { email_invited, role_invited } = request.body

            await WorkspaceService.invite(member, workspace_selected, email_invited, role_invited)

            response.status(201).json({
                ok: true,
                status: 200,
                message: 'Invitacion enviada con exito',
            })
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
                    'ERROR AL invitar', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async getById(request, response) {
        try {
            const {workspace_selected, member, user} = request
            /* const workspaces = await ChannelService.getAllByWorkspaceId(workspace_selected.id) */
            const workspace = await WorkspaceService.getById(workspace_selected.id). 
            response.status(200).json(
                {
                    ok: true,
                    status: 200,
                    message: 'espacios de trabajdo encontrados',
                    data: {
                        workspace: workspace
                    }
                }
            )
            
        }
        catch(error){
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR AL invitar', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
}
}

export default WorkspaceController