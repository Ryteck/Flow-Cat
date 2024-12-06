export default abstract class Entity<Props, RenderedProps = unknown> {
	constructor(protected props: Props) {}

	abstract render(): RenderedProps;
}
