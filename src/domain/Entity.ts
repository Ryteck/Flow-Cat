export default abstract class Entity<Props, RenderedProps = Props> {
	constructor(protected props: Props) {}

	abstract render(): RenderedProps;
}
