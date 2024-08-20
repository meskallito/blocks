export interface EventListener<TEvent> {
    /**
     * Handles the specified event.
     * @param event The event to handle.
     */
    handle(event: TEvent): Promise<void>;
}