"use client"

import React, { useState, useCallback } from 'react';
import {ReactFlow} from '@xyflow/react';
import {Background, Node, Edge, addEdge, applyNodeChanges, applyEdgeChanges, type OnConnect, type OnNodesChange, type OnEdgesChange} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SolarPanel {
  brand: string;
  price: number;
  wattage: number;
}

const solarPanels: SolarPanel[] = [
  { brand: "ECO-WORTHY", price: 150, wattage: 200 },
  { brand: "Ring", price: 60, wattage: 4 },
  { brand: "Jackery", price: 750, wattage: 200 },
];

const formSchema = z.object({
  solarPanel: z.enum(['ECO-WORTHY', 'Ring', 'Jackery']).describe('Select a solar panel brand')
})

function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      solarPanel: undefined,
    },
  })

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    const newNode = {
      id: crypto.randomUUID(),
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { 
        label: formData.solarPanel,
      },
      style: { width: 180, height: 40 },
      type: 'default',
    };
    console.log(nodes.length);
    setNodes(nodes => [...nodes, newNode]);
  };

  return (
    <div style={{ height: "80vh", width: "80vw"}}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
      <Background />
      </ReactFlow>
      <div className="flex-col justify-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
            <FormField
            control={form.control}
            name="solarPanel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solar Panel</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a solar panel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {solarPanels.map(panel => (
                      <SelectItem key={panel.brand} value={panel.brand}>
                        {panel.brand} - {panel.wattage}W (${panel.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          </form>
      </Form>
      </div>
    </div>
  );
}

export default Flow;