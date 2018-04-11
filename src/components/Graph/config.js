import React from 'react';

import * as BlockTypes from "../../types/blockTypes";

const SHAPE_START = 'shape_start';
const SHAPE_QUESTION = 'shape_question';
const SHAPE_VARIANT = 'shape_variant';
const SHAPE_ANSWER = 'shape_answer';

const shapeSize = {
    width: 50,
    height: 25
};

const containerProps = {
    viewBox: `0 0 ${shapeSize.width} ${shapeSize.height}`
};

const shapeProps = {
    ...shapeSize
};

const iconProps = {
    x: 25,
    y: 12.5,
    strokeWidth: 0,
    fontFamily: "Material Icons",
    textAnchor: "middle",
    fontSize: 10,
    fill: "currentColor"
};

const StartShape = (
    <symbol id={SHAPE_START} {...containerProps}>
        <rect {...shapeProps} />
        <text {...iconProps}>play_for_work</text>
    </symbol>
);

const QuestionShape = (
    <symbol id={SHAPE_QUESTION} {...containerProps}>
        <rect {...shapeProps} />
        <text {...iconProps}>help_outline</text>
    </symbol>
);

const VariantShape = (
    <symbol id={SHAPE_VARIANT} {...containerProps}>
        <rect {...shapeProps} />
        <text {...iconProps}>call_split</text>
    </symbol>
);

const AnswerShape = (
    <symbol id={SHAPE_ANSWER} {...containerProps}>
        <rect {...shapeProps} />
        <text {...iconProps}>priority_high</text>
    </symbol>
);

const EmptyEdgeShape = (
    <symbol viewBox="0 0 0 0" id="emptyEdge"/>
);

export default {
    NodeTypes: {
        [BlockTypes.BLOCK_TYPE_START]: {
            shapeId: `#${SHAPE_START}`,
            shape: StartShape
        },
        [BlockTypes.BLOCK_TYPE_QUESTION]: {
            shapeId: `#${SHAPE_QUESTION}`,
            shape: QuestionShape
        },
        [BlockTypes.BLOCK_TYPE_VARIANT]: {
            shapeId: `#${SHAPE_VARIANT}`,
            shape: VariantShape
        },
        [BlockTypes.BLOCK_TYPE_ANSWER]: {
            shapeId: `#${SHAPE_ANSWER}`,
            shape: AnswerShape
        }
    },
    EdgeTypes: {
        emptyEdge: {
            shapeId: "#emptyEdge",
            shape: EmptyEdgeShape
        }
    },
    NodeSubtypes: {},
}