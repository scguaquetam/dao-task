import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import useColumnDrop from "../../hooks/useColumnDrop";
import Task from "./Task";
import { ColumnType } from "../../enums/enums";
import { TaskModel } from "../../models/taskModel";
import { v4 as uuidv4 } from "uuid";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};
type ColumnProps = {
  columnName: string;
  color: string;
  tasks: TaskModel[];
};
function ColumnGroups({ columnName, color, tasks }: ColumnProps) {
  // const tasks: TaskModel[] = [
  //   {
  //     id: uuidv4(),
  //     title: "Task 1",
  //     column: ColumnType.TO_DO,
  //     color: "blue.300",
  //     category: "default",
  //   },
  //   {
  //     id: uuidv4(),
  //     column: ColumnType.IN_PROGRESS,
  //     title: "Task 2",
  //     color: "yellow.300",
  //     category: "default",
  //   },
  //   {
  //     id: uuidv4(),
  //     column: ColumnType.BLOCKED,
  //     title: "Task 3",
  //     color: "red.300",
  //     category: "default",
  //   },
  //   {
  //     id: uuidv4(),
  //     column: ColumnType.COMPLETED,
  //     title: "Task 4",
  //     color: "green.300",
  //     category: "default",
  //   },
  // ];
  const deleteTask = (id: string) => {};
  const addEmptyTask = () => {};
  const swapTasks = () => {};
  const updateTask = () => {};

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onUpdate={updateTask}
      onDelete={deleteTask}
    />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={1} rounded="lg" colorScheme={color}>
          {columnName}
        </Badge>
      </Heading>

      <Stack
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
      >
        <>
          <IconButton
            size="xs"
            w="full"
            color={useColorModeValue("gray.500", "gray.400")}
            bgColor={useColorModeValue("gray.100", "gray.700")}
            _hover={{ bgColor: useColorModeValue("gray.200", "gray.600") }}
            py={2}
            variant="solid"
            onClick={addEmptyTask}
            colorScheme="black"
            aria-label="add-task"
            icon={<AddIcon />}
          />
          {ColumnTasks}
        </>
      </Stack>
    </Box>
  );
}

export default ColumnGroups;
