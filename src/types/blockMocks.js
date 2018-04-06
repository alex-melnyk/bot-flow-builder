import * as BlockTypes from "./blockTypes";

const BlockMocks = [
    {
        type: BlockTypes.BLOCK_TYPE_START,
        icon: 'play_for_work',
        header: 'Start',
        content: 'Base block to start from.'
    }, {
        type: BlockTypes.BLOCK_TYPE_QUESTION,
        icon: 'help_outline',
        header: 'Question',
        content: 'Block to ask something.'
    }, {
        type: BlockTypes.BLOCK_TYPE_VARIANT,
        icon: 'call_split',
        header: 'Variant',
        content: 'Block to provide answer variant.'
    }, {
        type: BlockTypes.BLOCK_TYPE_ANSWER,
        icon: 'priority_high',
        header: 'Answer',
        content: 'Block to provide message after answer.'
    }
];

export {BlockMocks};