export default abstract class Command<
	CommandExecutionDTO = unknown,
	CommandExecutionReturn = unknown,
> {
	abstract execute(dto: CommandExecutionDTO): Promise<CommandExecutionReturn>;
}
