"use client"

import React, { useState, useCallback } from 'react';
import {ReactFlow} from '@xyflow/react';
import {Background, BackgroundVariant, Node, Edge, addEdge, applyNodeChanges, applyEdgeChanges, type OnConnect, type OnNodesChange, type OnEdgesChange} from '@xyflow/react';
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
import { Separator } from "@/components/ui/separator"

interface SolarPanel {
  brand: string;
  price: number;
  wattage: number;
}

interface Battery {
  brand: string;
  price: number;
  capacity: number;
}

const solarPanels: SolarPanel[] = [
  { brand: "ECO-WORTHY", price: 150, wattage: 200 },
  { brand: "Ring", price: 60, wattage: 4 },
  { brand: "Jackery", price: 750, wattage: 200 },
];

const batteries: Battery[] = [
  { brand: "ECO-WORTHY", price: 800, capacity: 7168 },
  { brand: "LiFePO4", price: 40, capacity: 120 },
  { brand: "Tesla", price: 2000, capacity: 13500 },
];

const solarFormSchema = z.object({
  solarPanel: z.enum(['ECO-WORTHY', 'Ring', 'Jackery']).describe('Select a solar panel brand')
})

const batteryFormSchema = z.object({
  battery: z.enum(['ECO-WORTHY', 'LiFePO4', 'Tesla']).describe('Select a battery brand')
})

function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalWattage, setTotalWattage] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);

  const solarForm = useForm<z.infer<typeof solarFormSchema>>({
    resolver: zodResolver(solarFormSchema),
    defaultValues: {
      solarPanel: undefined,
    },
  })

  const batteryForm = useForm<z.infer<typeof batteryFormSchema>>({
    resolver: zodResolver(batteryFormSchema),
    defaultValues: {
      battery: undefined,
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

  const solarSubmit = (formData: z.infer<typeof solarFormSchema>) => {
    const selectPanel = solarPanels.find((panel) => panel.brand === formData.solarPanel);
    setTotalCost(totalCost + selectPanel!.price);
    setTotalWattage(totalWattage + selectPanel!.wattage);
    const newNode = {
      id: crypto.randomUUID(),
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { 
        label: formData.solarPanel + " ☀️",
      },
      style: { width: 180, height: 40 },
      type: 'default',
    };
    setNodes(nodes => [...nodes, newNode]);
  };

  const batterySubmit = (formData: z.infer<typeof batteryFormSchema>) => {
    const selectBattery = batteries.find((battery) => battery.brand === formData.battery);
    setTotalCost(totalCost + selectBattery!.price);
    setTotalStorage(totalStorage + selectBattery!.capacity);
    const newNode = {
      id: crypto.randomUUID(),
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { 
        label: formData.battery + " ️🔋",
      },
      style: { width: 180, height: 40 },
      type: 'default',
    };
    setNodes(nodes => [...nodes, newNode]);
  };


  return (
    <div style={{ height: "80vh", width: "90vw"}}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
      <Background lineWidth={2} variant={BackgroundVariant.Lines}/>
      </ReactFlow>
      <Separator />
      <div className="flex gap-4 flex-row content-center p-4">
      <Form {...solarForm}>
        <form onSubmit={solarForm.handleSubmit(solarSubmit)}
          className="space-y-8">
            <FormField
            control={solarForm.control}
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
      <Form {...batteryForm}>
        <form onSubmit={batteryForm.handleSubmit(batterySubmit)}
          className="space-y-8">
            <FormField
            control={batteryForm.control}
            name="battery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Battery</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a battery" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {batteries.map(battery => (
                      <SelectItem key={battery.brand} value={battery.brand}>
                        {battery.brand} - {battery.capacity}Wh (${battery.price})
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
      <Separator orientation="vertical"/>
      <div className="flex flex-col place-content-between">
        <p>Total Cost: ${totalCost}</p>
        <p>Total Wattage: {totalWattage}W</p>
        <p>Total Storage: {totalStorage}Wh</p>
        <Button onClick={() => {setNodes([]); setEdges([]); setTotalCost(0); setTotalWattage(0); setTotalStorage(0);}}>Reset</Button>
      </div>
      </div>
    </div>
  );
}

export default Flow;