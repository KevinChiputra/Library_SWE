type ACLSubject = string;
type ACLActions = 'create' | 'delete' | 'manage' | 'read' | 'update';

interface ACLObj {
  action: ACLActions
  subject: ACLSubject
}

export type { ACLActions, ACLObj };
