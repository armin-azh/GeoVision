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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Context
import { ToolsContext, Tools } from "./context/tools-context";
import { GeoFenceEditContext, GeoFenceEditMode} from "./context/geofence-edit-context";


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
    }
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
                
                <CardContent className="space-y-2">
                    {
                        geoMode?.geofences.map((item, index)=>{
                            return (
                            <Item variant='outline' key={index}>
                                <ItemMedia variant='icon' style={{color: item.color}}>
                                    {Setup.shapes[item.type as ShapeType]}
                                </ItemMedia>
                                <ItemContent className="flex flex-col">
                                    <ItemTitle>{item.name}</ItemTitle>
                                    <ItemDescription>{item.type}</ItemDescription>
                                </ItemContent>

                                <ItemActions>
                                    <Button variant='ghost' size={'icon-xs'}>{item.locked?<LockIcon/>:<UnlockIcon/>}</Button>
                                    <Button variant='ghost' size={'icon-xs'}>{item.visible?<EyeIcon/>:<EyeOffIcon/>}</Button>
                                    <Button variant='ghost' size={'icon-xs'}><Edit2Icon/></Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant='destructive' size={'icon-xs'}><Trash2Icon/></Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>Remove Geofence</DialogTitle>
                                                <DialogDescription>
                                                    Remove this <span className="font-medium underline">{item.name}</span> from here. Click delete to remove.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button variant='destructive' type="submit">Delete</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
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