import { cn } from "@/lib/utils";
import { useContext } from "react";

// Container
import { Button } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup, FieldDescription, FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Context
import { ToolsContext, Tools } from "./context/tools-context";
import { GeoFenceEditContext } from "./context/geofence-edit-context";


// Icons
import { 
    EyeIcon, 
    LockIcon, 
    UnlockIcon, 
    EyeOffIcon,
    CircleIcon,
    Edit2Icon,
    SquareIcon,
    LineSquiggleIcon,
    Trash2Icon
} from "lucide-react";

const Setup = {
    shapes: {
        circle: <CircleIcon/>,
        rectangle: <SquareIcon/>,
        polygon: <LineSquiggleIcon/>,
    },

    geoCard: {
        title: 'Geofence Layer',
        description: 'You can select, remove and edit geofences.'
    },

    colorPallet: [
        '#bfdbfe', //'blue-200',
        '#dbeafe', //'green-200',
        '#fecaca', //'red-200',
        '#fef3c7', //'yellow-200',
        '#eaccf7', //'purple-200',
        '#fecaca', //'pink-200',
        '#fdba74', //'orange-200',
        '#06b6d4', //'cyan-200',
        '#14b8a6', //'teal-200',
        '#4f46e5'  //'indigo-200'
    ]
}


type ShapeType = keyof typeof Setup.shapes;

export function GeoFenceLayer(){
    const tools = useContext(ToolsContext);
    const geoMode = useContext(GeoFenceEditContext);

    return (
        <div className={cn('fixed top-30 bottom-1/5 right-0 translate-x-full z-50 transition-transform duration-300 w-90', {'translate-x-0 right-4': tools?.tool === Tools.GeoFence})}>
            <Card>
                <CardHeader>
                    <CardTitle>{Setup.geoCard.title}</CardTitle>
                    <CardDescription>{Setup.geoCard.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-2 px-2">
                    {
                        geoMode?.geofences.map((item, index)=>{
                            const deleteHandler = ()=>{

                            }
                            return (
                            <Item variant='outline' key={index}>
                                <ItemMedia variant='icon' style={{color: item.color}}>
                                    {Setup.shapes[item.type as ShapeType]}
                                </ItemMedia>
                                <ItemContent className="flex flex-col">
                                    <ItemTitle>{item.name}</ItemTitle>
                                    <ItemDescription className="capitalize">{item.type}</ItemDescription>
                                </ItemContent>

                                <ItemActions>
                                    <Button variant='ghost' size={'icon-xs'} onClick={() => geoMode?.lockGeofence(item.featureId)}>
                                        {item.locked?<LockIcon/>:<UnlockIcon/>}
                                    </Button>
                                    <Button variant='ghost' size={'icon-xs'} onClick={() => geoMode?.setVisibility(item.featureId, !item.visible)}>
                                        {item.visible?<EyeIcon/>:<EyeOffIcon/>}
                                    </Button>
                                    <Dialog>
                                        
                                            
                                            <DialogTrigger asChild><Button variant='ghost' size={'icon-xs'}><Edit2Icon/></Button></DialogTrigger>
                                            <DialogContent className="sm:max-w-sm">
                                                
                                                <DialogHeader>
                                                    <DialogTitle>Edit Geofence</DialogTitle>
                                                    <DialogDescription>
                                                        Edit the name and color of this geofence.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={(e)=>{
                                                        e.preventDefault();
                                                        const formData = new FormData(e.currentTarget);
                                                        const name = formData.get('name') as string;
                                                        console.log('name', name);
                                                        geoMode?.setGeofences((prev) => { return prev.map((g) => g.featureId === item.featureId ? { ...g, name } : g);}); 
                                                    }}>
                                                    <FieldGroup>
                                                        <Field>
                                                            <FieldLabel htmlFor="name-1">Name</FieldLabel>
                                                            <Input id="name-1" name="name" defaultValue={item.name}/>
                                                            <FieldDescription>Geofence display name</FieldDescription>
                                                        </Field>
                                                        <Field>
                                                            <FieldLabel htmlFor="username-1">Choose Color</FieldLabel>
                                                            
                                                            <div className="flex flex-wrap gap-2">
                                                                <Button key={index} variant='outline' size={'icon-xs'} className="w-8 h-8" style={{backgroundColor: item.color}}/>
                                                                {
                                                                    Setup.colorPallet.map((color, index)=>(
                                                                        <Button key={index} variant='outline' size={'icon-xs'} className={`w-8 h-8`} style={{backgroundColor: color}}  onClick={()=>geoMode?.setColor(item.featureId, color)}/>
                                                                    ))
                                                                }

                                                            </div>
                                                        </Field>
                                                    </FieldGroup>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline" >Cancel</Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button type="submit">Save changes</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </form>
                                                
                                                
                                            </DialogContent>
                                        
                                    </Dialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant='destructive' size={'icon-xs'}><Trash2Icon/></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent size="sm">
                                            <AlertDialogHeader>
                                                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                                    <Trash2Icon />
                                                </AlertDialogMedia>
                                                <AlertDialogTitle>Remove Geofence?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Remove this <span className="font-medium underline">{item.name}</span> from here. Click delete to remove.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
                                                <AlertDialogAction variant='destructive' onClick={()=> geoMode?.deleteGeofence(item.featureId)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </ItemActions>
                            </Item>
                            )
                        })
                    }

                </CardContent>
            </Card>
        </div>
    )

}