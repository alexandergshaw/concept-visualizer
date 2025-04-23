'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), {
    ssr: false,
});

export interface ConceptNode {
    id: string;
    group?: string;
    color?: string;
    val?: number;
}

export interface ConceptLink {
    source: string;
    target: string;
    label?: string;
}

export interface ConceptWebProps {
    nodes: ConceptNode[];
    links: ConceptLink[];
    title?: string;
    height?: number;
    backgroundColor?: string;
}

export default function ConceptWeb({
    nodes,
    links,
    title = 'Concept Web',
    height = 600,
    backgroundColor = '#111',
}: ConceptWebProps) {
    const fgRef = useRef<ForceGraphMethods>();

    useEffect(() => {
        fgRef.current?.zoomToFit(500);
    }, []);

    return (
        <div style={{ position: 'relative', height }}>
            <h2
                style={{
                    color: 'white',
                    textAlign: 'center',
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    fontFamily: 'sans-serif',
                }}
            >
                {title}
            </h2>
            <ForceGraph2D
                ref={fgRef}
                graphData={{ nodes, links }}
                backgroundColor={backgroundColor}
                nodeRelSize={6}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.id as string;
                    const fontSize = 12 / globalScale;
                    ctx.fillStyle = node.color || '#00f';
                    ctx.beginPath();
                    ctx.arc(node.x!, node.y!, 8, 0, 2 * Math.PI, false);
                    ctx.fill();

                    ctx.font = `${fontSize}px Sans-Serif`;
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(label, node.x!, node.y! + 16);
                }}
                linkColor={() => 'rgba(255,255,255,0.2)'}
                linkDirectionalArrowLength={3.5}
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={() => 0.003}
                cooldownTicks={100}
                onEngineStop={() => fgRef.current?.zoomToFit(400)}
            />
        </div>
    );
}
