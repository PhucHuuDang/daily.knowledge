"use client";

import * as React from "react";

import { EllipsisVertical, ArrowUpDown, ChevronDown } from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostWIthAuthor } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
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
} from "@/components/ui/alert-dialog";
import { useSetPublishAlertDialog } from "@/hooks/use-set-publish";
import { PublishCensor } from "./publish-censor";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj41",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj42",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj43",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<PostWIthAuthor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.author.image} />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col gap-x-1">
            <div className="uppercase font-bold">
              {row.original.author.name}
            </div>
            <div className="font-semibold text-sm">
              role: {row.original.author.role}
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // console.log({ row });
      // console.log(row.getValue("image"));
      return <div className="lowercase">{row.original.author.email}</div>;
    },
  },

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize text-base font-bold">{row.original.title}</div>
    ),
  },

  {
    accessorKey: "postType",
    header: "Post type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("postType")}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "News created at",
    cell: ({ row }) => {
      return (
        <div className="font-semibold text-sm">
          {format(
            new Date(row.original.createdAt as Date),
            "MMM d, yyyy 'at' h:mm a "
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "censored",
    header: "Censored",
    cell: ({ row }) => {
      const censoredText = row.getValue("censored")
        ? "Censored"
        : "Not censored";

      // console.log(row.getValue("censored"));
      return (
        <div
          className={`capitalize ${
            row.original.censored ? "text-sky-700" : "text-rose-700"
          }`}
        >
          {censoredText}
        </div>
      );
    },
  },

  {
    accessorKey: "censoredBy",
    header: "Censored By",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.censoredBy ?? "loading..."}
      </div>
    ),
  },

  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     console.log(formatted);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "published",
    header: () => <div className="text-right">Published</div>,
    cell: ({ row }) => {
      const publishedValue = row.getValue("published");

      const published = row.original.published;

      const publishedText = published ? "Published" : "Pending";

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              className={`text-right font-medium cursor-pointer hover:scale-110 transition duration-200 ${
                published ? "text-green-700" : "text-rose-700"
              } `}
            >
              {publishedText}
            </div>
          </AlertDialogTrigger>
          {/* <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to publish this post?
              </AlertDialogTitle>
              <AlertDialogDescription>
                The post will be published for readers reference, please make
                sure the content is appropriate.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent> */}
          <PublishCensor id={row.original.id} postTitle={row.original.title} />
        </AlertDialog>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.id);
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ data }: { data: PostWIthAuthor[] }) {
  // console.log({ data });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const publishDialog = useSetPublishAlertDialog();

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-slate-700">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                // console.log(column.id);
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-slate-600/10 ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-base text-slate-300 font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-600/10 cursor-pointer transition data-[state=selected]:bg-slate-500/20"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 ">
          <Button
            variant="outline"
            size="sm"
            className="text-rose-500"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="text-rose-500"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

{
  /* <AlertDialog>
<AlertDialogContent
  // ref={signOutRef}
  className="bg-[#21262d] border border-slate-400"
>
  <AlertDialogTrigger asChild className="z-50">
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogHeader className="font-semibold text-lg text-[#a8b3cf]">
    Do you want to allow publish this post?
  </AlertDialogHeader>
  <AlertDialogDescription className="text-sm font-light text-[#82899c]">
    {`The new "${row.original.title}" will be published.`}
  </AlertDialogDescription>
  <AlertDialogFooter className="mt-2 gap-x-1">
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Continue</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog> */
}
